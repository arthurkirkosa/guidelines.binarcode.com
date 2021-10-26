---
title: Laravel ddd
description: 'Architectural domain driven design'
position: 5
category: 'Style Guide'
---

## Domain Driven Design

The architectural design we adopted is DDD. The design is highly inspired from the [beyond CRUD](https://spatie.be/products/laravel-beyond-crud) spatie's book.

Bellow we will define how the file structure looks like, how to create a new domain, and how to manage Application layer vs Domain layer.

## Domain layer

This is how the application folder structure looks like for the domains:

```markdown
- app
  - Domains
    - Posts
        - Actions
            ApprovePostAction.php
            ...
        - States
        - Builders
        - Collections
        - Enums
        - Models
        - Events
        - Listeners
        - Dto
```

Few rules for domains: 

-  They should now know anything about the `Request`. So everything related to the request `Auth::user()`, `request()`, injected Request class in constructors, or passed requests as arguments isn't allowed.

- The domain could be visualized as a black box, where you send a compound or scalar type (a Data transfer object, a model, a string etc.), and get back another compound or a scalar response.

- Domains are sync, so jobs don't live in the domain.

Let's take each folder in part and document it.

### Actions

The action, is a single method class. Usually the method name is the [magic `__invoke`](https://www.php.net/manual/en/language.oop5.magic.php#object.invoke) method. 

#### Naming

Actions should be called in [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) and should end with `Action` suffix. Examples: `ApproveItemAction`, `AttachUserRolesAction`, `ConvertFileAction` etc.

A corner naming case, is when you have 2 (or more) nouns, say an action that attaches a role to a user. Use the passive noun firstly (the affected one) and then the active noun (the role in our case): 

```php
class AttachUserRoleAction 
```

What if we have one more noun, say, attaching to a user, a role from a certain company. The `company` describes the `role` membership, so it becomes an attributive adjective. So it should be placed [before the noun](https://www.ucl.ac.uk/internet-grammar/adjectiv/postpos.htm#:~:text=Adjectives%20in%20the%20first%20position,Instead%2C%20they%20follow%20a%20verb.): 

```php
class AttachUserCompanyRoleAction
```

Another example, say, we have to attach a user to the company, and give a certain role right away. So what do we have? The `company`, `user` and the `role`.  In this case the `company` is the `passive` member, as it will be modified, right? The company will become bigger (+1 member). So it should stay in the first place. Then we have the user and his role, they could live together: 

```php
class AttachCompanyUserRoleAction
```

either concatenated by a `with`: 

```php
class AttachCompanyUserWithRoleAction
```

#### Resolving

The action classes should be resolved from the [laravel container](https://laravel.com/docs/master/container#introduction) using the `app(ApprovePostAction::class)` helper, or injecting class into another constructor that's resolvable by the container:

```php
public function __construct(
    protected ApprovePostAction $approvePostAction
) {}
```

so you can call it as:

```php
($this->approvePostAction)($post);
```

### States

The state pattern is one of the best ways to add state-specific behaviour to models, while still keeping them clean.

State is a model state at a moment, it uses the [laravel model states](https://spatie.be/docs/laravel-model-states/v2/01-introduction) package under the hood.

Now, considering we might have various states (post approval states, post delivery states etc.) we will divide them in child directories with 1 level: 

```markdown
- app
  - Domains
    - Orders
            ...
        - States
            - Delivery
                - OrderFulfilledState.php
                - OrderReadyState.php
                - OrderShippedState.php
            - Approval
                - OrderApprovedState.php
                - OrderPendingState.php
                - OrderRejectedState.php
```

#### When 

We don't have to implement the state pattern all the time. They are really handy for cases where you have to implement specific logic in a certain state.

Say you have to check if the order should be delivered or not. In a classic approach you would do:

```php
// Order.php

public function isDeliverable() : bool
{
    if ($this->delivery_state === 'ready')  {
        return true;
    }
    
    return false;
}
```

Now, imagine you have another method, asking if the order should / or should not be paid: 

```php
// Order.php

public function isPayable() : bool
{
    if ($this->delivery_state === 'fulfilled')  {
        return true;
    }
    
    return false;
}
```

There are 2 limitations with this approach. 

The first one, you cannot scale horizontally. Say you have a new `delivery` state required by the business requirements. You'll have to go over all the methods that have logic around the state, and adapt them accordingly to the new introduced state. 

The second one is related to the readability, your model class become very fat. And generally saying, the model should care about the data, not about the business. 

States covers both limitations, and they add a beautiful API, so you can easily add a new state and implement all the methods your state configurator requires.
