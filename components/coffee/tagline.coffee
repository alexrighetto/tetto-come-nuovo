$ = require 'jquery'

do fill = (item = 'Fuck') ->
  $('.tagline').append "#{item}"
fill