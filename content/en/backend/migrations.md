---
title: Migrations
description: 'How the database migrations should look like'
position: 5
category: 'Backend'
---

## Avoid enum

Avoid `enum` type for columns, and use `string`. Instead, create [an enum](laravel-architectural#enums) constants.

Enum columns enforces you to have certain values from the very start, however, if the business requirements changes, it becomes a pain to alter the table and add more available values.

## Drop columns

The project runs tests with PHPUnit using SQLite. SQLite supports a limited subset of `ALTER TABLE`. The `ALTER TABLE` command in SQLite allows the user to rename a table or to add a new column to an existing table. It is not possible to
rename a column, remove a column, or add or remove constraints from a table. Because of this, tests may fail due to
migrations that contains `DROP` columns. To avoid this, we ignore dropping columns in tests:

```php
Schema::table('users', function (Blueprint $table) {
    if (App::environment('testing')) {
        return;
    }

    $table->dropColumn('name');
});
```

## How to create a migration

### Create a new table

You may use the `make:migration` Artisan command to generate a database migration. The new migration will be placed in
your `database/migrations` directory.

```shell
php artisan make:migration create_users_table
```

The migration class should be anonymous, so we don't have name collision:

```php
return new class extends Migration
{
    //
};
```

### Add a new column to an existing table

If you are adding a single column to an existing table, you must specify the column name at the end of the migration
command after `_add`.

```shell
php artisan make:migration alter_users_table_add_age
```

### Add multiple columns to an existing table

If you add multiple columns to an existing table you must specify that you add multiple `columns`.

```shell
php artisan make:migration alter_users_table_add_status_columns
```

### Updating Column Attributes

```shell
php artisan make:migration alter_users_table_change_columns
```

The change method allows you to modify the type and attributes of existing columns. For example, you may wish to
increase the size of a `string` column. To see the change method in action, let's increase the size of the `name` column
from `25` to `50`. To accomplish this, we simply define the new state of the column and then call the change method:

```php
$table->string('name', 50)->change();
```

## Timestamps

Each column related to time should end with `_at`. Example: `completed_at`, `approved_at`, `sent_at`. And they should be
defined as `timestamp` instead of `dateTime` or `date`. Use `date` only when you really need to store only the `date`.

### Table timestamps

```php
$table->timestamps();
```

The timestamps method creates `created_at` and `updated_at` `TIMESTAMP`

## Eloquent Append

If you want to expose a computed model attribute, you can use an [accessor](https://laravel.com/docs/master/eloquent-mutators#accessors-and-mutators). 

```php
public function getNameAttribute(): string
{
    return "{$this->first_name} {$this->last_name}";
}
```

Now, this attribute will only be evaluated when you call it specifically: 

```php
$user->name
```

However, you can always attach it to the model, using the `$append` model property:

```php
protected $appends = ['name'];
```

### Avoid appending relationships

Considering the `$append` attributes will be loaded everytime the model has read from the database, we should not have appended relationships:

```php
class Order extends Model
{
    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
    
    public function getItemsCountAttribute(): count
    {
        return $this->items()->count();
    }
}
```

Never append the `items_count` attribute, because it will have to do a mysql query to get the list of items everytime you retrieve the order from the database.

Instead, we can use append this dynamically where we really need that: 

```php
$orders = Orders::query()
->get()
->append('items_count')
```

So it will append the attribute to the orders collection dynamically.
