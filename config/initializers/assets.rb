# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( normalize.css )
Rails.application.config.assets.precompile += %w( percolator.css.scss comments.css.scss style_guide.css.scss header.css.scss fonts.css.scss)
Rails.application.config.assets.precompile += %w( raphael.js raphael-animated-viewbox.js )
Rails.application.config.assets.precompile += %w( BubbleMenu.js BubbleGraph.js Problem.js)
Rails.application.config.assets.precompile += %w( percolator.js )
Rails.application.config.assets.precompile += %w( jquery.js )
Rails.application.config.assets.precompile += %w( jquery.avgrund.min.js avgrund.css percolator-avgrund.js)
Rails.application.config.assets.precompile += %w( authentication.js )
