<% include header %>

<div class="row actions">
<a class="btn btn-info btn-sm" href="/${entity.name}">${entity.settitle}</a>
<a class="btn btn-primary btn-sm" href="/${entity.name}/<%= item._id %>/edit">Edit ${entity.title}</a>
<a class="btn btn-danger btn-sm" href="/${entity.name}/<%= item._id %>/remove">Delete ${entity.title}</a>
</div>

<div class="row">
    <table class="table-bordered">
<# entity.properties.forEach(function (property) { #>
        <tr>
            <td>${property.title}</td>
<# if (property.type == 'reference') { #>
            <td><a href="/${property.reference.name}/<%= item.${property.name} %>"/><%= references.${property.name}.name %></a></td>
<# } else { #>
            <td><%= item.${property.name} %></td>
<# } #>           
        </tr>
<# }); #>    
    </table>
</div>

<% include footer %>