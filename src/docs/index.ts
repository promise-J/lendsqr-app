import info from './info';
import servers from './server';
import schemas from './schemas';
import tags from './tags';
import paths from './paths';

const DOCS_OPTIONS = {
  ...info,
  ...servers,
  ...schemas,
  ...tags,
  ...paths
};

export default DOCS_OPTIONS;
