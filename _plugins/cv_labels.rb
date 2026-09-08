# frozen_string_literal: true

require "nokogiri"

# Render a standalone document from the CV plugin's content at build time.
# No client-side rewriting or inherited Bootstrap layout classes are needed.
module CvDocument
  def self.node(doc, tag, text = nil, class_name = nil)
    element = Nokogiri::XML::Node.new(tag, doc)
    element.content = text unless text.nil?
    element["class"] = class_name if class_name
    element
  end

  def self.render(html)
    doc = Nokogiri::HTML(html)
    cv = doc.at_css(".cv")
    return html unless cv

    original = cv.text.gsub(/\s/, "").chars.sort
    output = node(doc, "div", nil, "cv-document")
    cv.element_children.select { |child| child["class"].to_s.split.include?("card") }.each do |card|
      heading = card.at_css(".card-title").text.strip
      section = node(doc, "section", nil, "document-section")
      anchor = card.previous_element
      section_id = if anchor && anchor["id"]
                        anchor["id"]
                      else
                        heading.downcase.gsub(/[^a-z0-9]+/, "-")
                      end
      section_heading = node(doc, "h2", heading)
      section_heading["id"] = section_id
      section.add_child(section_heading)
      rows = card.css(".list-group-item > .row")
      if heading == "Contact Information"
        section["class"] += " contact-section"
        list = node(doc, "dl", nil, "document-contact")
        card.css("tr").each do |row|
          cells = row.css("td")
          pair = node(doc, "div")
          pair.add_child(node(doc, "dt", cells[0].text.strip))
          value = node(doc, "dd")
          value.inner_html = cells[1].inner_html
          pair.add_child(value)
          list.add_child(pair)
        end
        section.add_child(list)
      elsif rows.any?
        rows.each do |row|
          entry = node(doc, "article", nil, "document-entry")
          detail = row.at_css(".col-md-10")
          headings = detail.element_children.select { |child| child.name == "h6" }
          header = node(doc, "header")
          title = node(doc, "h3")
          title["data-toc-skip"] = ""
          title.inner_html = headings[0].inner_html
          header.add_child(title)
          header.add_child(node(doc, "span", row.at_css(".badge").text.strip, "document-date"))
          institution = node(doc, "div", nil, "document-institution")
          institution.inner_html = headings[1].inner_html if headings[1]
          header.add_child(institution)
          location = row.at_css(".location")
          header.add_child(node(doc, "span", location ? location.text.strip : "", "document-location"))
          entry.add_child(header)
          detail.element_children.drop(2).each do |child|
            copy = child.dup
            copy.remove_attribute("class")
            copy.remove_attribute("style")
            if copy.name == "h6"
              copy.name = "p"
              copy["class"] = "document-note"
            end
            entry.add_child(copy)
          end
          section.add_child(entry)
        end
      else
        card.element_children.drop(1).each { |child| section.add_child(child.dup) }
      end
      output.add_child(section)
    end
    raise "CV document conversion changed content" unless original == output.text.gsub(/\s/, "").chars.sort

    cv.replace(output)
    doc.to_html
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.url == "/cv/"

  page.output = page.output.gsub("Professional Title", "Position").gsub("Professional Summary", "Summary")
  page.output = page.output.sub(/<body class="/, '<body class="cv-page ')
  page.output = CvDocument.render(page.output)
end
