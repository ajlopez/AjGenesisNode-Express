<% include header %>

<div class="row actions">
<a class="btn btn-primary btn-sm" href="/${entity.name}/new">New ${entity.title}</a>
</div>

<div class="row">
    <table class="table-striped table-bordered">
        <tr>
            <th>&nbsp;</th>
    <#  entity.properties.forEach(function(property) { #>
            <th>${property.title}</th><# }); #>
        </tr>
    <% items.forEach(function (item) { %>
        <tr>
            <td><a href="/${entity.name}/<%= item.id %>">View</a></td>
        <#  entity.properties.forEach(function(property) { 
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

<% include footer %>
