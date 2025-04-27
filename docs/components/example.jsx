import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Example({ model, title }) {
  const { siteConfig } = useDocusaurusContext();
  const url = `${siteConfig.baseUrl}${model}/index.html`;

  return (
    <figure>
      <iframe src={url} width="100%" height="512"></iframe>
      <figcaption>
        {title}
      </figcaption>
    </figure>
  );
};