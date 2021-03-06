# lr360-js
Node module to access Lune Rouge 360 API.

### How to use

Include the following script snippet in your website:

```javascript
<script type="application/javascript">
    !function(e,n,t,r,s){e[s]=e[s]||function(){(e[s].queue=e[s].queue||[]).push(arguments)},e[s].l=1*new Date;var u=n.createElement(t),a=n.getElementsByTagName(t)[0];u.async=1,u.src=r,a.parentNode.insertBefore(u,a)}(window,document,"script","//cdn.lr360.io/api/lr360.js","lr360");

    lr360('setup', {key: 'XXXXX'}); // API access key
    lr360('identifyMember', {external_id: 'XXXXX'}); // member_id or external_id, you can also add the auto_create flag to true, if you want to automatically create a member in the plateform
</script>
```

# API

Parameters inside brackets `[...]` are optional.
Callbacks follow node convention `callback(error, response) { ... }`

### lr360('setup', options:object);

Client configuration. It should be the first command called after script is loaded. The following options are supported:

* `key:string` ( **mandatory** ) your API access key
* `dev:true|false` ( **default: false** ) Working environment. If true the library will throw errors, if false it will log them in the console
* `geolocation:true|false` ( **default: true** ) Activate or not the geolocation to get the coordinates when calling trackAction.
* `hostname:string` ( **default: 'api.lr360.io'** ) The host name to access the API
* `protocol:http|https` ( **default: 'https'** ) The protocol to access the API
* `port:number` ( **default: 443** ) The port number to access the API

For testing, you can use the host **'demo-api.fidem360.com'**, if you have a demo account created.

### lr360('identifyMember', options:object, [callback]);

Optional option: `auto_create:boolean`. Only works with external_id, if doesn't find the member in the plateform, it will created it if the flag is true.

Member lookup or creation if `auto_create` is true. If found/create, binds the current session to that member (useful to action tracking). One of the following 2 options can be provided:

* `member_id:string` 
* `external_id:string`

Callback response within `response.body.data`

* `id:string` Corresponds to member identifier

### lr360('clearMember', \[callback\]);

Unbinds the current session to the member.

### lr360('trackAction', type:string, [callback]);

Track an action.

Callback response within `response.body.data`

* `id:string` Corresponds to action identifier
* `member_id:string` Corresponds to member identifier
* `device_id:string` Corresponds to device identifier

### lr360('trackAction', options:object, \[callback\]);

Track an action. The following options are supported:

* `type:string` ( **mandatory** )the action type  
* `[data:object, tags:array]` any additional information you would like to save with the action 

Callback response within `response.body.data`

* `id:string` Corresponds to action identifier
* `member_id:string` Corresponds to member identifier
* `device_id:string` Corresponds to device identifier

### lr360('trackAction', type:string, options:object, \[callback\]);

Track an action. The following options are supported:

* `[data:object, tags:array]` any additional information you would like to save with the action 

Callback response within `response.body.data`

* `id:string` Corresponds to action identifier
* `member_id:string` Corresponds to member identifier
* `device_id:string` Corresponds to device identifier

### lr360('getMemberProfile', \[options:object\], callback);

Load a member profile. The following options is supported:

* `memberId:string` 

If options object is not provided, the profile loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getDeviceProfile', \[options:object\], callback);

Load a device profile. The following option is supported:

* `deviceId:string` 

If options object is not provided, the profile loaded will belong to the current session's device.

### lr360('getMemberChallenges', \[options:object\], callback);

Load member's challenges. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMemberChallengesDone', \[options:object\], callback);

Load member's done challenges. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMemberChallengesTodo', \[options\], callback);

Load member's challenges to do. The following option is supported:

* `memberId:string` 

If options object is not provided, the challenges loaded will belong to the current session's member. 
If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, an error will be returned.

### lr360('getMenus', \[options:object\], callback);

Load all menus available to member. The following option is supported:

* `memberId:string` 

If no options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public menus will be loaded.

### lr360('getPages', options:object, callback);

Load page contents available to member. The following options are supported:

* `pageId:string`
* `[memberId:string]`

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public pages will be loaded.

### lr360('getNews', options:object, callback);

Load news available to member. The following options are supported:

* `newsListId:string`
* `[memberId:string]`

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public news will be loaded.

### lr360('getContests', \[options:object\], callback);

Load all contests available to member. The following option is supported:

* `memberId:string` 

If no memberId in options object is provided and `lr360('identifyMember', options, callback);` has not been previously called, only public contests will be loaded.

# Advanced usage

Http methods are exposed directly on the lr360 object to make direct calls to known endpoints.

### lr360.get(endpoint:string, callback);

### lr360.post(endpoint:string, body:object, callback);

### lr360.put(endpoint:string, body:object, callback);

### lr360.delete(endpoint:string, callback);

# Integration tests

* Modify your computer's host file and add: `127.0.0.1       test.lr360`
* Add the domain `test.lr360:3333` to the account to be tested.
* Run the command `npm run test-integration`
* Open browser and point to `http://test.lr360:3333/tests/integration.html`
