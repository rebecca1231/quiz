import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <footer style={{ marginTop: "3rem" }}>
      <p>© 2020 {data.site.siteMetadata.author} </p>
    </footer>
  )
}

export default Footer
