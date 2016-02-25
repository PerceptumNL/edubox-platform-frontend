use Rack::Static,
  :urls => ["/images", "/scripts", "/styles"],
  :root => "dist"

use Rack::Deflater, :if => lambda { |env, status, headers, body| body.length > 512 }

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
