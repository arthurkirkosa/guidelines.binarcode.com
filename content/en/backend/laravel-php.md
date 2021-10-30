---
title: Styleguide
description: 'A style guide establishes standard style requirements to improve communication by ensuring consistency both within a document, and across multiple documents.'
position: 4
category: 'Backend'
---

## About Laravel

First and foremost, Laravel provides the most value when you write things the way Laravel intended you to write them.
If there's a documented way to achieve something, follow it. Whenever you do something differently, make sure you have a justification for *why* you didn't follow the defaults.

## General PHP Rules

Code style must follow [PSR-1](http://www.php-fig.org/psr/psr-1/), [PSR-2](http://www.php-fig.org/psr/psr-2/)
and [PSR-12](https://www.php-fig.org/psr/psr-12/). Generally speaking, everything string-like that's not public-facing
should use camelCase. Detailed examples on these are spread throughout the guide in their relevant sections.

### Class defaults

By default, we don't use `final`. For our open source stuff, we assume that all our users know they are responsible for writing tests for any overridden behaviour.

For the internal projects dto and enum classes should use `final`.

### Void return types

If a method return nothing, it should be indicated with `void` return type. This makes it more clear to the users of your code what
your intention was when writing it.

### Array access

Strictly avoid array property access: 

```php
$items['name']
```

Use the: 

````php
data_get($items, 'name')
````

## Typed properties

You should type a property whenever possible. Don't use a docblock. As we're using PHP 8.0+, all property types are
supported, you can use `mixed` if you're not sure about the type.

```php
// bad
class Foo
{
    /** @var string */
    public $bar;
}

// good
class Foo
{
    public string $bar;
}
```

## Docblocks

Don't use docblocks for methods that can be fully type hinted (unless you want to add a description).

Only add a descriptions when it provides more context than the method signature or name. Use full sentences for
descriptions, including a period at the end.

```php
// Bad: The description is redundant, and the method is fully type-hinted.
class Url
{
    /**
     * Create a url from a string.
     *
     * @param string $url
     *
     * @return \BinarCode\Url\Url
     */
    public static function fromString(string $url): Url
    {
        // ...
    }
}

// Good
class Url
{
    public static function fromString(string $url): Url
    {
        // ...
    }
}
```

Always use fully qualified class names in docblocks.

```php
// Bad
/**
 * @param string $foo
 *
 * @return Url
 */

// Good
/**
 * @param string $url
 *
 * @return \BinarCode\Url\Url
 */
```

When possible, docblocks should be written on one line.


// Bad
/**
 * @test
 */

```php
// Good
/** @var string */
/** @test */
```

If a variable has multiple types, the most common occurring type should be first.

```php
// Bad
/** @var null|\BinarCode\Goo\Bar */

// Good
/** @var \BinarCode\Goo\Bar|null */
```

## Constructor property promotion

Use constructor property promotion if all properties can be promoted. To make it readable, put each one on a line of its
own. Use a comma after the last one.

```php
// Good
class MyClass {
    public function __construct(
        protected string $firstArgument,
        protected string $secondArgument,
    ) {}
}

// Bad
class MyClass {
    protected string $secondArgument

    public function __construct(protected string $firstArgument, string $secondArgument)
    {
        $this->secondArgument = $secondArgument;
    }
}
```

## Traits

Each applied trait should go on its own line, and the use keyword should be used for each of them. This will result in
clean diffs when traits are added or removed.

```php
// Good
class MyClass
{
    use TraitA;
    use TraitB;
}
```

```php
// Bad
class MyClass
{
    use TraitA, TraitB;
}
```

## Strings

When possible prefer string interpolation above `sprintf` and the `.` operator.

```php
// Good
$greeting = "Hi, I am {$name}.";
```

```php
// Bad
$greeting = 'Hi, I am ' . $name . '.';
```

## Ternary operators

Every portion of a ternary expression should be on its own line unless it's a really short expression.

```php
// Good
$result = $object instanceof Model
    ? $object->name
    : 'A default value';

$name = $isFoo ? 'foo' : 'bar';

// Bad
$result = $object instanceof Model ?
    $object->name :
   'A default value';
```

## If statements

### Bracket position

Always use curly brackets.

```php
// Good
if ($condition) {
   ...
}

// Bad
if ($condition) ...
```

### Happy path

Generally a function should have its unhappy path first and its happy path last. In most cases this will cause the happy
path being in an unindented part of the function which makes it more readable.

```php
// Good

if (! $goodCondition) {
  throw new Exception;
}

// do work
```

```php
// Bad

if ($goodCondition) {
 // do work
}

throw new Exception;
```

### Avoid else

In general, `else` should be avoided because it makes code less readable. In most cases it can be refactored using early
returns. This will also cause the happy path to go last, which is desirable.

```php
// Good
if (! $conditionBA) {
   // conditionB A failed

   return;
}

if (! $conditionB) {
   // conditionB A passed, B failed

   return;
}

// condition A and B passed
```

```php
// Bad
if ($conditionA) {
   if ($conditionB) {
      // condition A and B passed
   }
   else {
     // conditionB A passed, B failed
   }
}
else {
   // conditionB A failed
}
```

### Compound ifs

In general, separate `if` statements should be preferred over a compound condition. This makes debugging code easier.

```php
// Good
if (! $conditionA) {
   return;
}

if (! $conditionB) {
   return;
}

if (! $conditionC) {
   return;
}

// do stuff
```

```php
// Bad
if ($conditionA && $conditionB && $conditionC) {
  // do stuff
}
```

## Comments

Comments should be avoided as much as possible by writing expressive code. If you do need to use a comment, format it
like this:

```php
// There should be a space before a single line comment.

/*
 * If you need to explain a lot you can use a comment block. Notice the
 * single * on the first line. Comment blocks don't need to be three
 * lines long or three characters shorter than the previous line.
 */
```

## Test classes

### Naming unit test

The unit test class name should be the same as the main class + `Test` suffix. Say we have to test
the `ApproveItemAction` class, the test name should be:

```php
class ApproveItemActionTest
```

### Namespace

The test class namespace should follow the main class namespace. Say your main class has the namespace:

```php
namespace App\Domains\Items\Actions\ApproveItemAction;
```

The unit test class should be placed in:

```php
namespace Tests\Domains\Items\Unit\ApproveItemAction;
```

## Whitespace

Statements should have to breathe. In general always add blank lines between statements, unless they're a sequence of
single-line equivalent operations. This isn't something enforceable, it's a matter of what looks best in its context.

```php
// Good
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();

    if (! $page) {
        return null;
    }

    if ($page['private'] && ! Auth::check()) {
        return null;
    }

    return $page;
}

// Bad: Everything's cramped together.
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();
    if (! $page) {
        return null;
    }
    if ($page['private'] && ! Auth::check()) {
        return null;
    }
    return $page;
}
```

```php
// Good: A sequence of single-line equivalent operations.
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```

Don't add any extra empty lines between `{}` brackets.

```php
// Good
if ($foo) {
    $this->foo = $foo;
}

// Bad
if ($foo) {

    $this->foo = $foo;

}
```

## Configuration

Configuration files must use kebab-case.

```
config/
  pdf-generator.php
```

Configuration keys must use snake_case.

```php
// config/pdf-generator.php
return [
    'chrome_path' => env('CHROME_PATH'),
];
```

Avoid using the `env` helper outside of configuration files. Create a configuration value from the `env`
variable like above.

## Artisan commands

The names given to artisan commands should all be kebab-cased.

```bash
# Good
php artisan delete-old-records

# Bad
php artisan deleteOldRecords
```

A command should always give some feedback on what the result is. Minimally you should let the `handle`method spit out a
comment at the end indicating that all went well.

```php
// in a Command
public function handle()
{
    // do some work

    $this->comment('All ok!');
}
```

If possible use a descriptive success message eg. `Old records deleted`.

## Routing

Public-facing urls must use kebab-case.

```
https://binarcode.com/open-source
https://binarcode.com/jobs/front-end-developer
```

Route names must use camelCase.

```php
Route::get('open-source', 'OpenSourceController@index')->name('openSource');
```

```html
<a href="{{ route('openSource') }}">
    Open Source
</a>
```

You can separate a group of similar routes names using the `.` dot separator like this:

```php
Route::get('items', 'ItemsController@index')->name('items.index');
Route::get('items/{id}', 'ItemsController@view')->name('items.show');
Route::get('items/approved', 'ItemsController@approved')->name('items.showApproved');
```

All routes have an http verb, that's why we like to put the verb first when defining a route. It makes a group of routes
very readable. Any other route options should come after it.

```php
// good: all http verbs come first
Route::get('/', 'HomeController@index')->name('home');
Route::get('open-source', 'OpenSourceController@index')->middleware('openSource');

// bad: http verbs not easily scannable
Route::name('home')->get('/', 'HomeController@index');
Route::middleware('openSource')->get('OpenSourceController@index');
```

Route parameters should use camelCase.

```php
Route::get('news/{newsItem}', 'NewsItemsController@index');
```

A route url should not start with `/` unless the url would be an empty string.

```php
// Good
Route::get('/', 'HomeController@index');
Route::get('open-source', 'OpenSourceController@index');

// Bad
Route::get('', 'HomeController@index');
Route::get('/open-source', 'OpenSourceController@index');
```

Route groups should be avoided, however, if you have to list of routes following the same middleware or pattern you can
add a group. The group attributes should avoid the `prefix` attribute because it makes the search confusing. Inside
the `group` callback always use the `Route` facade to define routes, this way you have type hint definition by the IDE
and static analysis.

```php
Route::group([
    'middleware' => 'api',
], function() {
    Route::get('items', ItemsController::class);
});
```

## Controllers

Controllers that control a resource must use the plural resource name.

```php
class PostsController
{
    // ...
}
```

Try to keep controllers simple and stick to the default CRUD keywords
(`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`). Extract a new controller if you need other actions.

In the following example, we could have `PostsController@favorite`, and `PostsController@unfavorite`, or we could
extract it to a separate `FavoritePostsController`.

```php
class PostsController
{
    public function create()
    {
        // ...
    }

    // ...

    public function favorite(Post $post)
    {
        app(AttachUserFavouritePostAction::class)(Auth::user(), $post);

        return response(null, 200);
    }

    public function unfavorite(Post $post)
    {
        app(DetachUserFavouritePostAction::class)(Auth::user(), $post);

        return response(null, 200);
    }
}
```

Here we fall back to default CRUD words, `store` and `destroy`.

```php
class FavoritePostsController
{
    public function store(Post $post)
    {
        app(AttachUserFavouritePostAction::class)(Auth::user(), $post);

        return response(null, 200);
    }

    public function destroy(Post $post)
    {
        app(DetachUserFavouritePostAction::class)(Auth::user(), $post);

        return response(null, 200);
    }
}
```

This is a loose guideline that doesn't need to be enforced.

Controllers that aren't for CRUD operations, should be `invokeable`, so they should have only one `__invoke` method
public, and others private methods if needed.

```php
class ApprovePostController
{
    public function __invoke(Post $post)
    {
        if (! request()->user()->can('approve', $post)) {
            return response('Unauthorized to approve this post.', 403);
        }

        $post->approve();

        return response(null, 200);
    }
}
```

### Requests

Accessing a request property should always happen by using the `input` or `collect` request methods: 

```php
$request->input('name')
```

```php
$request->collect()->
```

## Views

View files must use camelCase.

```
resources/
  views/
    openSource.blade.php
```

```php
class OpenSourceController
{
    public function index() {
        return view('openSource');
    }
}
```

## Validation

When using multiple rules for one field in a form request, avoid using `|`, always use array notation. Using an array
notation will make it easier to apply custom rule classes to a field.

```php
// Good
public function rules()
{
    return [
        'email' => ['required', 'email'],
    ];
}

// Bad
public function rules()
{
    return [
        'email' => 'required|email',
    ];
}
```

All custom validation rules must use snake_case:

```php
Validator::extend('organisation_type', function ($attribute, $value) {
    return OrganisationType::isValid($value);
});
```

## Blade Templates

Indent using four spaces.

```html
<a href="/open-source">
    Open Source
</a>
```

Don't add spaces after control structures.

```html
@if($condition)
Something
@endif
```

## Authorization

Policies must use camelCase.

```php
Gate::define('editPost', function ($user, $post) {
    return $user->id == $post->user_id;
});
```

```html
@can('editPost', $post)
<a href="{{ route('posts.edit', $post) }}">
    Edit
</a>
@endcan
```

Try to name abilities using default CRUD words. One exception: replace `show` with `view`. A server shows a resource, a
user views it.

## Translations

Translations must be rendered with the `__` function. We prefer using this over `@lang`
in Blade views because `__` can be used in both Blade views and regular PHP code. Here's an example:

```php
<h2>{{ __('newsletter.form.title') }}</h2>

{!! __('newsletter.form.description') !!}
```

## Naming

Naming things is often seen as one of the harder things in programming. That's why we've established some high level guidelines for naming.

### Naming symmetry

Symmetry is a very important [factor in art](https://www.pencilkings.com/symmetry-in-art/). Our brain [is trained](https://www.futurity.org/symmetry-math-brains-956472/) to perceive the symmetry as something familiar and easy to remember. So let's reflect that in our code naming, as others will read our code easier.

See the difference:

```php
// bad
class GiveAGiftController
{
//
}
```

```php
// good
class GiftsController
{
//
}
```

Simply avoid short interjections or conjunctions (and, a) in the middle of the name:

```php
// bad
public function deleteAnElement()
```
```php
// good
public function deleteElement()
```

Sometimes we can spend "precious" minutes looking for a good symmetric, still suggestive name, but it worth so.

There are some tools that might help with this task, you can use the [thesaurus](https://www.thesaurus.com/browse/approve) to find synonyms to a specific word. Say you need a synonym for the `approve` word. You can also use the [wordassociations](https://wordassociations.net/en/words-associated-with/approve) to find words from the same area, so you can use. I know, it takes some time, but you'll end up doing an extraordinary code.

### Atoms

Properties, variables and methods are the application atoms, the smallest pieces that combined creates the magic.

#### Variables

A generic rule is that the naming could be long, as soon as it's enough descriptive. Variables should say what they store:

```php
// bad
$data = collect([$post]);
```

```php
// good
$posts = collect([$post]);
```

#### Methods

Methods should say what they do, and should not repeat the context they live in:

```php
// Post.php model

// bad
public function approvePost() {
//...
}
```

```php
// Post.php model

// good
public function approve() {
//...
}
```

You see, the `approve` method is placed into the `Post.php` model, so there is no reason to suffix it with the `Post` indicator.

Set methods could not necessarily start with `set` as well as `getters` could not start with `get`. To benefit of a fluent and expressive API of your code, always return the `$this` and name setters as the property itself:

```php
class Post
{
    public string $title;

    public function title(string $title): static
    {
        $this->title = $title;

        return $this;
    }
}
```

From our experience, getters aren't used to often, however, if you have to get the Post title you could make:

```php
public function getTitle(): string
{
    return $this->title;
}
```

Boolean methods:


```php
public function isApproved() : bool
{
    return ! is_null($this->approved_at);
}
```

### Controllers

Generally controllers are named by the plural form of their corresponding resource and a `Controller` suffix. This is to
avoid naming collisions with models that are often equally named.

e.g. `UsersController` or `EventDaysController`

When writing non-resourceful controllers you might come across invokable controllers that perform a single action. These
can be named by the action they perform again suffixed by `Controller`.

e.g. `PerformCleanupController`

### Resources (and transformers)

Both Eloquent resources and Fractal transformers are plural resources suffixed with
`Resource` or `Transformer` accordingly. This is to avoid naming collisions with models.

### Jobs

A job's name should describe its action and end with `Job`.

E.g. `CreateUserJob` or `PerformDatabaseCleanupJob`

### Events

Events will often be fired before or after the actual event. This should be very clear by the tense used in their name.

E.g. `ApprovingLoanEvent` before the action is completed and `LoanApprovedEvent` after the action is completed.

### Listeners

Listeners will perform an action based on an incoming event. Their name should reflect that action with a `Listener`
suffix. This might seem strange at first but will avoid naming collisions with jobs.

E.g. `SendInvitationMailListener`

### Commands

To avoid naming collisions we'll suffix commands with `Command`, so they are easiliy distinguisable from jobs.

e.g. `PublishScheduledPostsCommand`

### Mailables

Again to avoid naming collisions we'll suffix mailables with `Mail`, as they're often used to convey an event, action or
question.

e.g. `AccountActivatedMail` or `NewEventMail`

#### Markdown

The mailable class should render a markdown file:

```php
public function build()
{
    return $this->markdown('bladeFile');
}
```

The common way of sending data through the markdown should be via [public class properties](https://laravel.com/docs/8.x/mail#via-public-properties).


The markdown file `bladeFile.blade.php` should follow few rules:

1. It should not be indented. The indentation makes the email rendering ugly.

2. It should use markdown components, for example if you have to add a button:

```markdown
@component('mail::button', ['url' => $url])
View Order
@endcomponent
```

That's because the mailable theme could be customized, so these components will adapt accordingly to the used theme.

3. The markdown should avoid html tags as much as possible (ie div, p, a etc.). They are useless in markdown, and makes it hard to read.
