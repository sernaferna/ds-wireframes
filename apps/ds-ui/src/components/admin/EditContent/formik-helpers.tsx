import { Chapter, PartType, Section, SectionPart, Tutorial } from '@devouringscripture/common';
import * as yup from 'yup';

export const partSchema = yup.object({
  type: yup.string().required().oneOf(['text', 'heading', 'example']),
  content: yup.string().required(),
});
export type FormikPartType = yup.InferType<typeof partSchema>;

export const sectionSchema = yup.object({
  title: yup.string().required(),
  parts: yup.array().of(partSchema),
});
export type FormikSectionType = yup.InferType<typeof sectionSchema>;

export const chapterSchema = yup.object({
  mainSection: sectionSchema,
  subSections: yup.array().of(sectionSchema),
});
export type FormikChapterType = yup.InferType<typeof chapterSchema>;

/**
 * Helper function to generate an empty chapter, for insertion
 * into the tree.
 *
 * @returns Empty `FormikChapterType` object
 */
export const getEmptyChapter = (): FormikChapterType => ({
  mainSection: {
    title: '',
    parts: [],
  },
  subSections: [],
});

export const tutorialSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  chapters: yup.array().of(chapterSchema),
});
export type FormikTutorialType = yup.InferType<typeof tutorialSchema>;

/**
 * Helper function to convert browser-side Formik data to server-friendly
 * data for working with the API.
 *
 * @param formikObj Data as captured by Formik
 * @returns A `SectionPart` object as used by the DS APIs
 */
export const getPartFromFormik = (formikObj: FormikPartType): SectionPart => ({
  type: formikObj.type as PartType,
  content: formikObj.content,
});

export const getPartsFromFormik = (formikArr: FormikPartType[]): SectionPart[] =>
  formikArr.map((part) => getPartFromFormik(part));

const getSectionFromFormik = (formikObj: FormikSectionType): Section => ({
  title: formikObj.title,
  parts: getPartsFromFormik(formikObj.parts || []),
});

const getSectionsFromFormik = (formikArr: FormikSectionType[]): Section[] =>
  formikArr.map((s) => getSectionFromFormik(s));

const getChapterFromFormik = (formikObj: FormikChapterType): Chapter => ({
  mainSection: getSectionFromFormik(formikObj.mainSection),
  subSections: getSectionsFromFormik(formikObj.subSections || []),
});

const getChaptersFromFormik = (formikArr: FormikChapterType[]): Chapter[] =>
  formikArr.map((ch) => getChapterFromFormik(ch));

/**
 * Helper function to convert browser-side Formik data to server-friendly
 * data for working with the API.
 *
 * @param formikObj Data as captured by Formik
 * @returns A `Tutorial` object as used by the DS APIs
 */
export const getTutorialFromFormik = (formikObj: FormikTutorialType): Tutorial => ({
  id: formikObj.id,
  name: formikObj.name,
  chapters: getChaptersFromFormik(formikObj.chapters || []),
});
