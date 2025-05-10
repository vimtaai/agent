import { useEffect, useState } from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from "@theme/CodeBlock";

export default function Example({ model, title }) {
  const { siteConfig } = useDocusaurusContext();
  const modelDir = `${siteConfig.baseUrl}${model}`;
  const htmlUrl = `${modelDir}/index.html`;
  const jsUrl = `${modelDir}/index.js`;

  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(jsUrl)
    .then(response => response.text())
    .then(code => { setCode(code) });
  }, [model])

  return (
    <Tabs>
      <TabItem value="live" label="Live example">
        <figure>
          <iframe src={htmlUrl} width="100%" height="512"></iframe>
          <figcaption>
            {title}
          </figcaption>
        </figure>
      </TabItem>

      <TabItem value="code" label="Source code">
        <CodeBlock language="js">{code}</CodeBlock>
      </TabItem>
    </Tabs>
  );
};