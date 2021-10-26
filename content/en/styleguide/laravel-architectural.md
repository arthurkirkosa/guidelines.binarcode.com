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

- Resolving

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
