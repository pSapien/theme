import RNFS from 'react-native-fs';
import { unzip } from 'react-native-zip-archive';

const ZIP_DOWNLOAD_PATH = `${RNFS.TemporaryDirectoryPath}/theme.zip`;
const THEME_ASSET_UNZIPPED_PATH = `${RNFS.DocumentDirectoryPath}/theme`;

export async function downloadTheme(link) {
  try {
    /**  download the zip file which contains all the theme information */
    await RNFS.downloadFile({
      fromUrl: link,
      toFile: ZIP_DOWNLOAD_PATH,
      begin: () => {},
      background: true,
      progressInterval: 0,
      progress: ({ bytesWritten, contentLength, jobId }) => {
        const downloadProgress = Math.floor((bytesWritten / contentLength) * 100);
        console.log(downloadProgress);
      },
    }).promise;

    /** unzip the zip file and extract out the assets */
    await RNFS.mkdir(THEME_ASSET_UNZIPPED_PATH);
    await unzip(ZIP_DOWNLOAD_PATH, THEME_ASSET_UNZIPPED_PATH);
  } catch (err) {
    console.log('this is the erro', err.message);
    throw new Error(err.message);
  } finally {
    /** when everything is done, delete the zip file  */
    RNFS.unlink(ZIP_DOWNLOAD_PATH);
  }
}

export async function loadTheme(id) {
  try {
    /** get the selected theme directory from the folder */
    const selectedThemeDir = (await RNFS.readDir(THEME_ASSET_UNZIPPED_PATH)).find(
      p => p.name === id,
    );

    /** extract the manifest content file and read the assets paths */
    const content = await RNFS.readFile(selectedThemeDir.path + '/manifest.json');
    const { assets } = JSON.parse(content);

    /** resolve the asset path directory with respect to its folder */
    return resolveAssetPath(assets, selectedThemeDir.path);
  } catch (err) {
    throw new Error(err.message);
  }
}

function resolveAssetPath(assetsDict, dirPrefix) {
  const resolved = {};

  function resolve(asset) {
    if (asset.startsWith('/') || asset.startsWith('./')) {
      return 'file://' + dirPrefix + asset;
    }

    return asset;
  }

  for (const assetKey in assetsDict) {
    const asset = assetsDict[assetKey];

    if (Array.isArray(asset)) {
      resolved[assetKey] = asset.map(resolve);
    } else if (typeof asset === 'object') {
      resolved[assetKey] = resolveAssetPath(asset, dirPrefix);
    } else {
      resolved[assetKey] = resolve(asset);
    }
  }

  return resolved;
}
