import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function Index({ data }) {
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  return (
    <div>
      <Helmet title={config.siteTitle} />
      <SEO />

      <div className="container">
        <div className="hero-wrapper">
          <Hero title="Hey" index>
            <p className="hero-description small width">
             lorem ispum lorem ispum lorem ispum lorem ispum
             lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum lorem ispum
              🌱
            </p>
          </Hero>
          <div className="decoration">
            <img
              src="/ram.png"
              alt="RAM Ram"
              className="image hero-image"
              title="RAM Ram"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <section className="segment first">
          <Heading title="Latest Posts" slug="/blog" />

          <Posts data={simplifiedLatest} newspaper />
        </section>

        <section className="segment large">
          <Heading title="Highlights" />

          <div className="highlight-preview">
            {simplifiedHighlights.map((post) => {
              return (
                <div className="muted card flex" key={`popular-${post.slug}`}>
                  {post.thumbnail && <Img fixed={post.thumbnail} />}
                  <div>
                    <time>{post.date}</time>
                    <Link className="card-header" to={post.slug}>
                      {post.title}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="segment large">
          <Heading title="Projects" slug="/projects" />

          <div className="post-preview">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="anchored card" key={project.slug}>
                    <div>
                      <time>{project.date}</time>
                      <a
                        className="card-header"
                        href={`https://github.com/taniarascia/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.name}
                      </a>
                      <p>{project.tagline}</p>
                    </div>
                    <div className="anchored links">
                      {project.writeup && (
                        <Link className="button" to={project.writeup}>
                          Article
                        </Link>
                      )}
                      <a
                        className="button flex"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </div>
    </div>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            shortTitle
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 45, height: 45) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
