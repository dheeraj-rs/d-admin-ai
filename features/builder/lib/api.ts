import { Component } from '../types';
import { getBaseUrl } from './utils';

export async function loadTheme(
  themeFolder: string,
  standaloneServer: boolean,
): Promise<Component[]> {
  const baseUrl = getBaseUrl(standaloneServer);
  const url = standaloneServer
    ? `${baseUrl}/theme?name=${themeFolder}`
    : `${baseUrl}?type=theme&name=${themeFolder}`;

  const response = await fetch(url);
  const components = await response.json();
  return components;
}

export async function savePage(
  html: string,
  standaloneServer: boolean,
): Promise<void> {
  const baseUrl = getBaseUrl(standaloneServer);
  const url = standaloneServer
    ? `${baseUrl}/data?path=${location.pathname}&ext=html`
    : `${baseUrl}?type=data&path=${location.pathname}&ext=html`;

  await fetch(url, {
    method: 'POST',
    body: html,
  });
}

export async function loadPage(standaloneServer: boolean): Promise<string> {
  const baseUrl = getBaseUrl(standaloneServer);
  const url = standaloneServer
    ? `${baseUrl}/data?path=${location.pathname}&ext=html`
    : `${baseUrl}?type=data&path=${location.pathname}&ext=html`;

  const response = await fetch(url);
  const html = await response.text();
  return html;
}
