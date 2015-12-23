<% include header %>

<div class="row actions">
<a class="btn btn-info btn-sm" href="/${entity.name}">${entity.settitle}</a>
<a class="btn btn-primary btn-sm" href="/${entity.name}/<%= item.id %>/edit">Edit ${entity.title}</a>
<a class="btn btn-danger btn-sm" href="/${entity.name}/<%= item.id %>/remove">Delete ${entity.title}</a>
</div>

<div class="row">
    <table class="table-bordered">
<# entity.properties.forEach(function (property) { #>
        <tr>
            <td>${property.title}</td>
<# if (property.type == 'reference') { #>
            <td><a href="/${property.reference.name}/<%= item.${property.name}.id %>"/><%= item.${property.name}.name %></a></td>
<# } else { #>
            <td><%= item.${property.name} %></td>
<# } #>           
        </tr>
<# }); #>    
    </table>
</div>

<# entity.referenced.forEach(function (ref) { #>
<div class="row">
<h2>${ref.inverse.title}</h2>

<table class="table-striped table-bordered">
    <tr>
        <th>&nbsp;</th>
<#  ref.entity.properties.forEach(function(property) { 
        if (property === ref)
            return;
#>
        <th>${property.title}</th><# }); #>
    </tr>
<% item.${ref.inverse.name}_${ref.name}.forEach(function (item) { %>
    <tr>
        <td><a href="/${ref.entity.name}/<%= item.id %>">View</a></td>
    <#  ref.entity.properties.forEach(function(property) { 
        if (property === ref)
            return;
        if (property.type == 'reference') { #>
        <td><a href="/${property.reference.name}/<%= item.${property.name}.id %>"/><%= item.${property.name}.name %></a></td>
        <# }
        else { #>
        <td><%= item.${property.name} %></td>
    <# 
        }
        }); #>
    </tr>
<% }); %>
</table>

</div>
<# }); #>

<% include footer %>