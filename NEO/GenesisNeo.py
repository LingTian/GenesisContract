from boa.interop.Neo.Runtime import Log, Notify
from boa.interop.Neo.Storage import Get, Put, GetContext, Delete
from boa.interop.Neo.Runtime import GetTrigger, CheckWitness, Serialize, Deserialize
from boa.builtins import concat, substr, keys, values, range, list

def Main(operation, args):
    nargs = len(args)
    if nargs == 0:
        print("No domain name supplied")
        return 0

    if operation == 'GetCharacter':
        id = args[0]
        return GetCharacter(id)

    elif operation == 'InsertCharacter':
        return InsertCharacter(args)

def GetCharacter(id):
    Notify(concat("GetCharacter: ", id))

    intId = int(id)

    context = GetContext()
    character = Get(context, intId)
    if not character:
        if intId == 0:
            return ConvertToString(NewInstance())
        Notify(concat("Character does not exist, id: ", intId))
        return False

    characterList = Deserialize(character)
    Notify(characterList)

    return ConvertToString(ConvertFromList(characterList))

def InsertCharacter(attrList):

    ID_TIP_KEY = "id-tip-key"

    Notify("Calling InsertCharacterByAttrList")
    context = GetContext()

    # Make sure that it can be converted correctly
    character = ConvertFromList(attrList)

    nextId = Get(context, ID_TIP_KEY)
    if not nextId:
        Notify("id-tip-key is not set")
        nextId = 0
    else:
        Notify("id-tip-key is set")

    nextId = nextId + 1

    serialized = Serialize(attrList)
    Notify(serialized)

    Put(context, nextId, serialized)
    Put(context, ID_TIP_KEY, nextId)

    return nextId

def ConvertFromList(keyValArgs):
    instance = NewInstance()
    nArgs = len(keyValArgs)
    for i in range(0, nArgs):
        if i % 2 == 0:
            key = keyValArgs[i]
        else:
            value = keyValArgs[i]
            instance[key] = value
    return instance

'''
Create a new instance of the character
Nested attributes are not supported yet.
'''
def NewInstance():
    instance = {
        'name': 'Adam',
        'hp': '100',
        'mp': '100',
        'str': '50',
        'int': '50',
        'san': '50',
        'luck': '50',
        'charm': '50'
    }
    return instance

def ConvertToString(dict):
    serialized = '{'
    allKeys = keys(dict)
    for i in range(0, len(allKeys)):
        key = allKeys[i]
        if i != 0:
            serialized = concat(serialized, ',')
        keyValPair = concat(concat(key,':'), dict[key])
        serialized = concat(serialized, keyValPair)
    serialized = concat(serialized, '}')
    return serialized

def ConvertToList(dict):
    converted = list()
    allKeys = keys(dict)
    for i in range(0, len(allKeys)):
        key = allKeys[i]
        converted.append(key)
        converted.append(dict[key])
    return converted
