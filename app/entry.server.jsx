import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { injectStyles, createStylesServer } from '@mantine/remix';
import dotenv from "dotenv";
dotenv.config();

const server = createStylesServer();

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);
  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set("X-Powered-By", "Malboro");

  return new Response(`<!DOCTYPE html>${injectStyles(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}