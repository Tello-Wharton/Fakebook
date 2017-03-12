var search = instantsearch({
  appId: 'TRSE7O3IIG',
  apiKey: '883a415024ea2e75c8451da21a42d077',
  indexName: 'testing-purposes',
  urlSync: false
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    autofocus: false,
    placeholder: 'Ask a question'
  })
);

var hitTemplate = `<div class="question">
  <div class="questionBorder"></div>
  <div class="questionContents">
    <h2>{{{name}}}</h2>
    <p>{{{_highlightResult.content.value}}}</p>
  </div>
</div>`
var hitTemplate = `<div class="post main-content">
    <div class="post-body">
        <img src="" alt="User" class="profile-picture fbPicture-{{id}}"/>
        <p class="name fbName-{{{id}}}">Placeholder name</p>
        <p class="post-text">{{{_highlightResult.content.value}}}</p>
    </div>
</div>`

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';


search.addWidget(
  instantsearch.widgets.hits({
    container: '.searchfeed',
    hitsPerPage: 11,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.id = hit.id.replace("SuperAwesomeMakeAmericaGreatAganAndGetMyId", "");
      if($("#q").val().trim() != "") {
          $(".searchfeed").show();
      }
      else {
          $(".searchfeed").hide();
      }
      return hit;
    }
  })
);

search.start();
