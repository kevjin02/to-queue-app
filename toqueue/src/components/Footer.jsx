import React from "react";


/**
 * Creates footer.
 * @returns  {object} - HTML footer with simple copyright.
 */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;