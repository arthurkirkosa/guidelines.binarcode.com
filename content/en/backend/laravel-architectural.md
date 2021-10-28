---
title: Domains
description: 'Architectural domain driven design'
position: 5
category: 'Backend'
---

# Domain Driven Design

The architectural design we adopted is DDD. The design is highly inspired from the [beyond CRUD](https://spatie.be/products/laravel-beyond-crud) spatie's book.

Bellow we will define how the file structure looks like, how to create a new domain, and how to manage Application layer vs Domain layer.

# Domain layer

This is how the application folder structure looks like for the domains:

```markdown
- app
  - Domains
    - Posts
        - Actions
            ApprovePostAction.php
            ...
        - States
        - QueryBuilders
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

## Actions

The action, is a single method class. Usually the method name is the [magic `__invoke`](https://www.php.net/manual/en/language.oop5.magic.php#object.invoke) method. 

### Naming

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

### Resolving

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

## States

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

### When 

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

## Query Builders

`QueryBuilders` folder could store a list of custom query builders. 

### Builder class

Let's start with [the technique](https://dev.to/rocksheep/cleaner-models-with-laravel-eloquent-builders-12h4) of registering a custom Eloquent Builder for a model.

The Builder class should extend the main eloquent builder: 

```php
namespace App\Domains\Posts\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;

class PostQueryBuilder extends Builder
{
    public function published(): self
    {
        return $this->whereNotNull('published_at');
    }
    
    //
}
```

```php
// Post.php
public function newEloquentBuilder($query): PostQueryBuilder
{
    return new PostQueryBuilder($query);
}
```

Having this mechanism, we basically added a `scopePublished` laravel [local scopes](https://laravel.com/docs/master/eloquent#local-scopes) to our `Post` model: 

````php
Post::query()->published()->get();
````

Since now the `Post::query()` method returns an instance of a custom builder, let's instruct the model using PHPDoc about that, so we can benefit of IDE autocompletion: 

```php
/**
 * @method static PostQueryBuilder query()
 */
class Post extends Model
{}
```

### Custom queries

We might have other custom queries, that contain a domain specific logic: 

```php
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Builder;

class OrderDeliveryQuery
{
    public function __invoke(Relation|Builder $query): Relation|Builder
    {
        return $query
        ->where(...
    }
}
```
So you can invoke this from a custom query or relation: 

```php
app(OrderDeliveryQuery::class)($user->posts())
```

## Collections

Using custom [laravel collections](https://laravel.com/docs/8.x/collections) is a very powerful technique to ensure your code is fluent and readable.

### Model collection

Using the mindset of a custom [query model query builder](#builder-class), we can also provide custom collection classes for relations. Laravel has great collection support, though you often end up with long chains of collection functions either in the model or in the application layer. This again isn't ideal, and luckily Laravel provides us with the needed hooks to bundle collection logic into a dedicated class.
Here's an example of a custom collection class, and note that it's entirely possible to combine several methods into new ones, avoiding long function chains in other places.

```php
namespace App\Domains\Orders\Collections;

use Illuminate\Database\Eloquent\Collection;

class OrderCollection extends Collection
{
    public function notVirtual(): self
    {
        return $this->reject(fn (Item $item) => $item->is_virtual);
    }
}
```

### Custom collections

A custom collection is a simple class that extends the `Illuminate\Support\Collection` and implement custom methods. Let's imagine we have a checkout endpoint, and that sends an array with products `uuids` the user wants to buy: 

```json
[
  {"product_uuid":  "B22D34F3-965C-41CD-9977-CD8EE6ACD0B8", "quantity":  2},
  {"product_uuid":  "9BFC0AC6-4F4D-4E3C-973D-26DA17B3F8B0", "quantity":  1}
]
```

It would be very useful if we could transform this json into a typed collection of items, let's do that: 

```php
use Illuminate\Support\Collection;

class CheckoutItemsCollection extends Collection
{
    public static function makeFromBag(array $productsBag): self
    {
        return new static($productsBag);
    }
    
    public function mapIntoCheckoutItem(): self
    {
        return $this->map(fn(array $item) => new CheckoutItem(...$item));
    }
}
```

Now we can easily manipulate this collection, say transform these items into a `Dto`: 

```php
// CheckoutController.php

CheckoutItemsCollection::makeFromBag($request->input('products'))
->mapIntoCheckoutItem()
```

Following the same mindset, we can create as many collections we need, and load them with custom public methods, that always return the same `self` instance, so we can chain the call.

## Enums

Enum are special final classes that stores list of static values. 

### MyClabs Enum

Until the [PHP8.1 built in enums](https://php.watch/versions/8.1/enums) is ready, we're enforced to use open source packages. The [MyClabs enum](https://github.com/myclabs/php-enum) is the most popular one, and we should use almost everywhere: 

```php
namespace App\Domains\Users\Enums;

use MyCLabs\Enum\Enum;

final class RoleEnum extends Enum
{
    public const admin = 'admin';
    public const guest = 'guest';
    public const publisher = 'publisher';
}
```

### Spatie Enum

The Spatie's `spatie/laravel-enum` [library](https://spatie.be/docs/enum/v3/usage/100-laravel#breadcrumb) is useful if we have to deal with [model cast](https://laravel.com/docs/master/eloquent-mutators#introduction), as the package allows that built in.

```php
namespace App\Domains\Users\Enums\RoleEnum;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self admin()
 * @method static self guest()
 * @method static self publisher()
 */
final class RoleEnum extends Enum
{}
```

#### Limitations

As it stores the value only, there is a limitation, it doesn't allow you to easily customize the `label` for the enum. You have to copy the PHPDoc values into a static `labels` method. But, you have to repeat yourself there, and this [is not a good practice](https://deviq.com/principles/dont-repeat-yourself).

Say you have to store a list of products `uuids`: 

```php
/**
 * @method static self analysis()
 * @method static self coq10()
 * @method static self mfs()
 * ...
 */
final class ProductUuidEnum extends Enum
{
    public static function labels(): array
    {
        return [
            'analysis' => '9BFC0AC6-4F4D-4E3C-973D-26DA17B3F8B0',
            'coq10' => '8BFC0AC6-4F4D-4E3C-973D-26DA17B3F8B0',
            'mfs' => '7BFC0AC6-4F4D-4E3C-973D-26DA17B3F8B0',
            //...
        ];
    }
}
```


And then, if you have to access a specific product uuid, we have to use: 

```php
ProductUuidEnum::analysis()->label
```

Another limitation is that you cannot use the `uuid` or any other value starting with a number as a PHPDoc `method` syntax in this case. And considering we're using enums quite often for aliasing, this becomes quite a big limitation. 

## Models

The `models` folder includes the main domain Model, say `Order.php` in our case. 

### Model class

The model class should always define few things: 

- [Table name](https://laravel.com/docs/master/eloquent#table-names)

```php
    protected $table = 'orders';
```

- [Fillable fields](https://laravel.com/docs/master/eloquent#mass-assignment)

We don't rely on `$guarded = []`, instead we want to explicitly define what attributes are `fillable`.

```php
    protected $fillable = [
        'uuid',
        'price',
        ...
    ];
```

- PHPDoc including fillables

Models resolve database properties magically using the [`__get`](https://www.php.net/manual/en/language.oop5.overloading.php#object.get) method. Considering our IDE or [static analyzer](https://github.com/nunomaduro/larastan) doesn't know anything about these properties, we have to explicitly define those into the PHPDoc: 

```php
/**
 * Class Order
 * 
 * @property int $id
 * @property string $uuid
 * @property float $price
 *
 * @package App\Models
 */
class Order extends Model
{} 
```

As we know Laravel perform lazy loading if we [access a relationship as a property](https://laravel.com/docs/master/eloquent-relationships#relationship-methods-vs-dynamic-properties). But again, the static analyzer doesn't know about this `magic`, so 
we have to instruct it by adding a PHPDoc definition for every single relationship. 

Say our model has a `belongsTo` and a `hasMany` relationship: 

```php
public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
{
    return $this->belongsTo(User::class);
}

public function items(): \Illuminate\Database\Eloquent\Relations\HasMany
{
    return $this->hasMany(Item::class);
}
```

These properties should be `read` mode:

```php
/**
* @property-read User|null $user
* @property-read \Illuminate\Database\Eloquent\Collection $items
 */
class Order extends Model
{
    //
}
```

Lately, if you define custom [local scopes](https://laravel.com/docs/master/eloquent#local-scopes) or any other `magic` methods, they should be added in the PHPDoc: 

```php
/**
 * @method static \Illuminate\Database\Eloquent\Builder|Order active()
 */
class Order extends Model
{
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
```

- [Cast](https://laravel.com/docs/master/eloquent-mutators#attribute-casting)

Casts are very important to be added, so we can manipulate data in a typed/structured way: 

```php
protected $casts = [
    'user_id' => 'int',
    'active' => 'boolean',
    'shipping_address' => ShippingAddressCast::class,
];
```

These are the required fields to every model, the `$casts` one could be avoided if you really don't have anything to cast.

## Events

[Events](https://laravel.com/docs/master/events#introduction) are just classes, that could be dispatched (fired) when a certain event happened in your application.

An example of event could be the `OrderApprovedEvent`.

### Naming

Depending on the event dispatching time reported to the event itself the naming should be slightly different.

Let's take the `order approval` process. 

```php
// OrdersController.php

...

event(new OrderApprovingEvent($order)); // before

app(ApproveOrderAction::class)($order); // actual action event

event(new OrderApprovedEvent($order)); // after 
...
```

So the event that tells about something that should `immediately happen` should be called in a [gerund](https://en.wikipedia.org/wiki/Gerund)  form, whereas the event after the action happened should be called in the [past form](https://en.wikipedia.org/wiki/Past).

To avoid collision we will suffix event classes with `Event`.

### Class

An event class should use constructor promotion and `SerializesModels` so queued events will still work properly:

```php
namespace App\Domains\Orders\Events\OrderApprovedEvent;

use App\Domains\Orders\Models\Order;
use Illuminate\Queue\SerializesModels;

class OrderApprovedEvent
{
    use SerializesModels;

    public function __construct(
        public Order $order
    ) { 
    }
}
```

## Listeners

[Event listeners](https://laravel.com/docs/master/events#queued-event-listeners) are classes that handles certain events and perform specific actions. Say we have to send a notification email as soon the order was approved:

### Naming

The name of the listener name should be in active (imperative) form, and say what it does. For example: `SendApprovalNotificationListener`. 

### Class

Usually the listener should be queued, so it should implement the `ShouldQueue` contract:

```php
use App\Domains\Orders\Events\OrderApprovedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendApprovalNotificationListener implements ShouldQueue
{
    public function handle(OrderApprovedEvent $event)
    {
        //
    }
}
```

## Dto

Data transfer objects (or dto) are one of the most powerful wires, that links the application layer with the domain layer, and much more. 

The DTO is a variation of an [value object](https://martinfowler.com/bliki/ValueObject.html) class, that encapsulate certain data and send it along the application.

A basic example of a Dto could be a class with some public properties. Let's take the example with [custom collection](#custom-collections) and create the `CheckoutItemDto` class:

```php
final class CheckoutItemDto 
{
    public function __construct(
        public string $productUuid,
        public int $quantity,
    ) {
    }
}
```

So instead of sending the plain array: 

```json
{"product_uuid":  "9BFC0AC6-4F4D-4E3C-973D-26DA17B3F8B0", "quantity":  1}
```

We will pass fully qualified dto classes. 

### Why?

Dto help us to: 

- keep consistent data
- validate certain properties [using attributes](https://www.php.net/manual/en/language.attributes.overview.php) 
- extend the class with public or private methods

### Spatie Dto

We're using the [Spatie's dto library](https://github.com/spatie/data-transfer-object), that handles the object construction, validation and casts, so the class will basically look like this: 

```php
use Spatie\DataTransferObject\DataTransferObject;

final class CheckoutItemDto extends DataTransferObject
{
        public string $productUuid,
        
        public int $quantity,
}
```

So you can instantiate it using:

```php
new CheckoutItemDto(
    productUuid: data_get($item, 'product_uuid'),
    quantity: data_get($item, 'product_quantity')
)
```
