# frozen_string_literal: true

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.url == "/cv/"

  page.output = page.output.gsub("Professional Title", "Position").gsub("Professional Summary", "Summary")
  page.output = page.output.sub(/<body class="/, '<body class="cv-page ')
end
