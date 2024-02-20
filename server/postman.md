# Test in Postman
Use the random data generator to quickly create a user.
```json
{
  "name": "{{$randomFirstName}} {{$randomLastName}}",
  "email": "{{$randomBsBuzz}}@{{$randomDomainName}}",
  "password": "..."
}
```
Pre-request script
```javascript
pm.variables.replaceIn('{{$randomFirstName}} {{$randomLastName}}');
pm.variables.replaceIn('{{$randomDomainName}}');
pm.variables.replaceIn('{{$randomBsBuzz}}');
```
