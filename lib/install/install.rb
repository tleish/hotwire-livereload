APP_LAYOUT_PATH = Rails.root.join("app/views/layouts/application.html.erb")
CABLE_CONFIG_PATH = Rails.root.join("config/cable.yml")

if APP_LAYOUT_PATH.exist?
  say "Add Hotwire Livereload tag in application layout"
  content = <<-HTML
\n  <%= hotwire_livereload_tags if Rails.env.development? %>
HTML
  insert_into_file APP_LAYOUT_PATH, content.chop, before: /\s*<\/head>/
else
  say "Default application.html.erb is missing!", :red
  say %(  Add <%= hotwire_livereload_tags %> within the <head> tag in your custom layout, after the `<%= action_cable_meta_tag %>`.)
end

if !CABLE_CONFIG_PATH.exist?
  say 'ActionCable with TurboStreams required to use Hotwire Livereload.'
end
