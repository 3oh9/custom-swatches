import themeDBService from '../../services/DB/theme';

export const getThemes = async (req, res, next) => {
  const { shop, token } = req.appContext;

  let themesResponse;

  try {
    themesResponse = await themeDBService
      .getThemes(shop, token);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: themesResponse,
  });
};

export const getMainTheme = async (req, res, next) => {
  const { shop, token } = req.appContext;

  let themeResponse;

  try {
    themeResponse = await themeDBService
      .getMainTheme(shop, token);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: themeResponse,
  });
};

export default {
  getThemes,
  getMainTheme,
};
