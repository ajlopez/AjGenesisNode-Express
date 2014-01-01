<% layout('layout') -%>

<div class="row actions">
<a class="btn btn-info btn-sm" href="/${entity.name}">${entity.setdescriptor}</a>
<a class="btn btn-info btn-sm" href="/${entity.name}/${entity._id}">View ${entity.descriptor}</a>
</div>

<div class='row'>
<form method="post" role="form" class="form">
<# entity.properties.forEach(function (property) { #>
    <div class="form-group">
        <label for="${property.name}">${property.descriptor}</label>
        <input type="text" class="form-control" name="${property.name}" id="${property.name}" value="<%= item.${property.name} %>">
    </div>    
<# }); #>
    
    <input class="btn btn-primary" type="submit" value="Update" />
</form>
</div>


