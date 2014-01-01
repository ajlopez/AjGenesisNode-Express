<% layout('layout') -%>

<div class="row actions">
<a class="btn btn-primary" href="/${entity.name}/new">New ${entity.descriptor}</a>
</div>
<div class="row">
<table class="table-striped table-bordered">
    <tr>
        <th>&nbsp;</th>
<#  entity.properties.forEach(function(property) { #>
        <th>${property.descriptor}</th><# }); #>
    </tr>
<% items.forEach(function (item) { %>
    <tr>
        <td><a href="/${entity.name}/<%= item._id %>">View</a></td>
<#  entity.properties.forEach(function(property) { #>
        <td><%= item.${property.name} %></td><# }); #>
    </tr>
<% }); %>
</table>
</div>

