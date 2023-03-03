---
title: Home
slug: /
sections:
  - title:
      text: Here goes your business main value proposition
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: >-
      This is the best place to go for all your branding needs! From logo design
      to social media marketing, we can help get your business noticed.
    text: |-
      Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.
      Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet
      erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat
      vitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.
    actions:
      - label: Get started
        url: /
        icon: arrowRight
        iconPosition: right
        style: primary
        type: Button
      - label: Learn more
        url: /
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        type: Link
    elementId: homepage-hero
    colors: bg-light-fg-dark
    backgroundImage:
      url: /images/shapes-in-the-corners-bg.svg
      altText: Bg image corners
      backgroundSize: cover
      backgroundPosition: center
      backgroundRepeat: no-repeat
      opacity: 100
      type: BackgroundImage
    styles:
      self:
        alignItems: center
        flexDirection: row
        justifyContent: center
      text:
        textAlign: center
      subtitle:
        textAlign: center
    type: GenericSection
  - subtitle: Award winning enterprises trust us
    images:
      - url: /images/empathy_jcmigz.svg
        altText: Empathy logo
        type: ImageBlock
      - url: /images/wellster.svg
        altText: Wellster logo
        type: ImageBlock
      - url: /images/vise.svg
        altText: Vise logo
        type: ImageBlock
      - url: /images/telus.svg
        altText: Telus logo
        type: ImageBlock
      - url: /images/contenful.svg
        altText: Contentful logo
        type: ImageBlock
      - url: /images/sanity.svg
        altText: Sanity logo
        type: ImageBlock
      - url: /images/rangle.svg
        altText: Rangle logo
        type: ImageBlock
    motion: move-to-left
    colors: bg-light-fg-dark
    styles:
      self:
        justifyContent: center
      subtitle:
        textAlign: center
    type: ImageGallerySection
  - posts:
      - content/pages/blog/case-study-1.md
      - content/pages/blog/case-study-2.md
      - content/pages/blog/case-study-3.md
    showThumbnail: true
    showDate: true
    showAuthor: true
    variant: three-col-grid
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-16
          - pl-16
          - pb-16
          - pr-16
        justifyContent: center
    type: FeaturedPostsSection
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection
  - title:
      text: Grow your business 10x faster
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: This is a subtitle
    text: |-
      Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.
      Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet
      erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat
      vitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.
    media:
      title: Title of the video
      url: >-
        https://res.cloudinary.com/stackbit-com/video/upload/c_scale,f_auto,w_1200/v1662491281/Home_page_header_V2_launch_V.2_2_fdyqq7.mp4
      controls: true
      aspectRatio: '16:9'
      styles:
        self:
          padding:
            - pt-2
            - pb-2
            - pl-2
            - pr-2
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
      type: VideoBlock
    badge:
      label: Key Benefits
      color: text-primary
      styles:
        self:
          textAlign: center
      type: Badge
    colors: bg-light-fg-dark
    styles:
      self:
        flexDirection: col
        justifyContent: center
      subtitle:
        textAlign: center
    type: GenericSection
  - title:
      text: Share your stats here
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Stats section subtitle
    items:
      - title: 500k
        tagline: This is the tagline
        subtitle: Numbers Done
        text: >-
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        image:
          url: /images/icon-one.svg
          altText: Featured icon one
          type: ImageBlock
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: row
            justifyContent: center
            textAlign: left
        type: FeaturedItem
      - title: 20x
        tagline: This is the tagline
        subtitle: The Job Stuff
        text: >-
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        image:
          url: /images/icon-four.svg
          altText: Featured icon two
          type: ImageBlock
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            textAlign: left
            borderRadius: x-large
            flexDirection: row
            justifyContent: center
        type: FeaturedItem
      - title: 200%
        tagline: This is the tagline
        subtitle: Faster
        text: >-
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        image:
          url: /images/icon-two.svg
          altText: Featured icon three
          type: ImageBlock
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: row
        type: FeaturedItem
    actions:
      - label: Get started
        url: /
        icon: arrowRight
        iconPosition: right
        style: primary
        type: Button
    badge:
      label: Key Results
      color: text-primary
      styles:
        self:
          textAlign: center
      type: Badge
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pb-32
          - pt-20
          - pl-4
          - pr-4
        justifyContent: center
      subtitle:
        textAlign: center
    type: FeaturedItemsSection
  - title:
      text: Social Media Management
      color: text-dark
      type: TitleBlock
    subtitle: Increase your reach
    text: >
      A service that helps businesses to manage their social media accounts and
      posts.
    actions:
      - label: Get started
        url: /
        icon: arrowRight
        iconPosition: right
        style: secondary
        type: Button
      - label: See Tutorials
        url: /
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        type: Link
    media:
      url: /images/feature-image.svg
      altText: Fun feature preview
      type: ImageBlock
    badge:
      label: This is a badge
      color: text-primary
      type: Badge
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
    type: GenericSection
  - title:
      text: Business Consulting
      color: text-dark
      type: TitleBlock
    subtitle: Be in good company
    text: >
      A service that provides advice and guidance to startups and small
      businesses.
    actions:
      - label: Get started
        url: /
        icon: arrowRight
        iconPosition: right
        style: secondary
        type: Button
      - label: See Tutorials
        url: /
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        type: Link
    media:
      url: /images/feature-image-two.svg
      altText: Dope design preview
      type: ImageBlock
    badge:
      label: This is a badge
      color: text-primary
      type: Badge
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row-reverse
    type: GenericSection
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection
  - subtitle: This is a subtitle
    items:
      - title: >-
          “A designer knows he has achieved perfection not when there is nothing
          left to add, but when there is nothing left to take away.”
        tagline: Testimonial 1
        subtitle: Maria Walters, Company
        text: >-
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        image:
          url: /images/person-four.jpg
          altText: Rhonda
          styles:
            self:
              borderRadius: full
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-9
              - pb-9
              - pl-9
              - pr-9
            textAlign: left
            borderRadius: large
            flexDirection: row
            justifyContent: center
        type: FeaturedItem
      - title: >-
          “Quote from some important person goes right here. I love using
          Stackbit.”
        tagline: Testimonial 2
        subtitle: Jane Doe, Company
        text: >-
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
          explicabo.
        image:
          url: /images/person-five.jpg
          altText: Nina
          styles:
            self:
              borderRadius: full
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-9
              - pb-9
              - pl-9
              - pr-9
            textAlign: left
            borderRadius: large
            flexDirection: row
            justifyContent: center
        type: FeaturedItem
    variant: next-prev-nav
    colors: bg-light-fg-dark
    styles:
      self:
        justifyContent: center
      subtitle:
        textAlign: center
    type: CarouselSection
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection
  - title:
      text: List of features here
      color: text-primary
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Featured items section subtitle
    items:
      - title: Feature Item One
        tagline: This is the tagline
        subtitle: This is the item subtitle
        text: |
          Follow the tutorial to build your first Stackbit site.
        image:
          url: /images/post-one.svg
          altText: Exclamation mark on red background
          styles:
            self:
              borderRadius: x-large
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: col
        type: FeaturedItem
      - title: Feature Item Two
        tagline: This is the tagline
        subtitle: This is the item subtitle
        text: |
          Follow the tutorial to build your first awesome Stackbit site.
        image:
          url: /images/post-two.svg
          altText: Lightning bolt symbol on red background
          styles:
            self:
              borderRadius: x-large
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: col
        type: FeaturedItem
      - title: Feature Item Three
        tagline: This is the tagline
        subtitle: This is the item subtitle
        text: |
          Learn from the tutorial and build your first awesome Stackbit site.
        image:
          url: /images/post-three.svg
          altText: Stackbit logomark on red background
          styles:
            self:
              borderRadius: x-large
          type: ImageBlock
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: col
        type: FeaturedItem
    variant: three-col-grid
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-16
          - pl-8
          - pb-8
          - pr-8
        justifyContent: center
      subtitle:
        textAlign: center
    type: FeaturedItemsSection
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection
  - title:
      text: Generic Section With A Form
      color: text-dark
      type: TitleBlock
    subtitle: Section with a form subtitle
    text: |-
      Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl.
      Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet
      erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat
      vitae interdum. Ut nec massa eget lorem blandit condimentum et at risus.
    media:
      fields:
        - name: name
          label: Name
          hideLabel: true
          placeholder: Your name
          isRequired: true
          width: full
          type: TextFormControl
        - name: email
          label: Email
          hideLabel: true
          placeholder: Your email
          isRequired: true
          width: full
          type: EmailFormControl
        - name: message
          label: Message
          hideLabel: true
          placeholder: Your message
          width: full
          type: TextareaFormControl
      submitButton:
        label: Submit
        icon: arrowRight
        iconPosition: right
        style: primary
        type: SubmitButtonFormControl
      action: /.netlify/functions/submission_created
      elementId: contact-form
      styles:
        self:
          padding:
            - pt-6
            - pb-6
            - pl-6
            - pr-6
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
      type: FormBlock
    badge:
      label: Contact Us
      color: text-primary
      type: Badge
    colors: bg-light-fg-dark
    type: GenericSection
seo:
  metaTitle: Home - Demo site
  metaDescription: This demo site is built with Stackbit
  socialImage: /images/soc-feature-image.png
  type: Seo
type: PageLayout
---
