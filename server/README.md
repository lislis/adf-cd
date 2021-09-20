Some curls to populate and test


Create a group

``` bash
curl -i -X POST -H "Content-Type: application/json" -d '{ "name":"CoolGroup" }' localhost:3000/api/groups
```


Create a chat

``` bash
curl -i -X POST -H "Content-Type: application/json" -d '{ "name":"chatbbbb", "group": "agroupid" }' localhost:3000/api/chats
```

Create a message

``` bash
curl -i -X POST -H "Content-Type: application/json" -d '{ "chat":"achatid", "message": "Ask me anything", "isOwnMessage": "false" }' localhost:3000/api/messages
```
