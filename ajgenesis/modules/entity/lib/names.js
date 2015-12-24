
function getName(name) {
    if (!name)
        return null;
        
    return name.toLowerCase();
}

function getSetName(name) {
    return getPlural(getName(name));
}

function getDescriptor(name) {
    if (!name)
        return null;
        
    return name[0].toUpperCase() + name.slice(1);
}

function getSetDescriptor(name) {
    return getPlural(getDescriptor(name));
}

function getDescription(name) {
    return getName(name);
}

function getPlural(name) {
    if (!name)
        return null;
        
    if (name[name.length - 1] == 's')
        return name;
        
    if (name[name.length - 1] == 'y')
        return name.substring(0, name.length - 1) + 'ies';
        
    return name + 's';
}

function getParameterValue(parval) {
    var position = parval.indexOf('=');
    
    if (position < 0)
        return { name: parval, value: true };
        
    var name = parval.substring(0, position);
    var value = parval.substring(position + 1);
    
    if (isInteger(value))
        value = parseInt(value);
    else if (value == "true")
        value = true;
    else if (value == "false")
        value = false;
    else if (value == "null")
        value = null;
        
    return { name: name, value: value };
}

function isInteger(value) {
    if (!value.length)
        return false;
        
    for (var k = 0; k < value.length; k++)
        if (value[k] < '0' || value[k] > '9')
            return false;
            
    return true;
}

module.exports = {
    getName: getName,
    getSetName: getSetName,
    getDescriptor: getDescriptor,
    getSetDescriptor: getSetDescriptor,
    getDescription: getDescription,
    getPlural: getPlural,
    getParameterValue: getParameterValue
}

