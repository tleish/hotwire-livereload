return if Hotwire::Livereload::Engine.config.hotwire_livereload.reload_method == :turbo_stream

class Hotwire::Livereload::ReloadChannel < ActionCable::Channel::Base
  def subscribed
    stream_from "hotwire-reload"
  end
end
