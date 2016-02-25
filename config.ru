use Rack::Static,
  :urls => ["/images", "/scripts", "/styles"],
  :root => "dist",
  :header_rules => [
    # Cache all static files in public caches (e.g. Rack::Cache)
    #  as well as in the browser
    [:all, {'Cache-Control' => 'public, max-age=31536000'}]
  ]

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('dist/index.html', File::RDONLY)
  ]
}
