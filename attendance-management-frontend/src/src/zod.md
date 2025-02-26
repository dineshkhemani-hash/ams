## What is Zod?
Zod is a TypeScript-first schema declaration and validation library. It allows you to define schemas for your data and validate that data against those schemas. Zod is particularly useful for validating data coming from external sources, such as API requests.

## Basic concepts
z.object function is used to define an object schema. Each key in the object schema corresponds to a key in the data you want to validate, and the value is a Zod schema that describes the type and constraints for that key.

## Example
const userSchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});
const formData = {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com'
};

try {
    const validatedData = partialUserSchema.parse(formData);
    console.log('Validated Data:', validatedData);
} catch (error) {
    console.error('Validation Error:', error.errors);
}

## Partial schema
The partial method creates a new schema where all fields are optional. This is useful when you want to validate a subset of the data.
e.g. const validationSchema = userSchema.partial();


## Last method is parse method
The parse method validates the data against the schema. If the data is valid, it returns the validated data. If the data is invalid, it throws an error.
e.g. const validatedData = validationSchema.parse(formData);


## Advance Concepts
### Nested objects
-- define schemas for nested objects.
e.g 
const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string().length(5, 'Zip code must be 5 characters')
});

const userWithAddressSchema = z.object({
    id: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    address: addressSchema
});

### define schemas for arrays.
const userArraySchema = z.array(userSchema);

const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' }
];

try {
    const validatedUsers = userArraySchema.parse(users);
    console.log('Validated Users:', validatedUsers);
} catch (error) {
    console.error('Validation Error:', error.errors);
}