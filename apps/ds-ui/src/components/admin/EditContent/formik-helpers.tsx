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

export const getPartFromFormik = (formikObj: FormikPartType): SectionPart => ({
  type: formikObj.type as PartType,
  content: formikObj.content,
});

export const getPartsFromFormik = (formikArr: FormikPartType[]): SectionPart[] =>
  formikArr.map((part) => getPartFromFormik(part));

export const getSectionFromFormik = (formikObj: FormikSectionType): Section => ({
  title: formikObj.title,
  parts: getPartsFromFormik(formikObj.parts || []),
});

export const getSectionsFromFormik = (formikArr: FormikSectionType[]): Section[] =>
  formikArr.map((s) => getSectionFromFormik(s));

export const getChapterFromFormik = (formikObj: FormikChapterType): Chapter => ({
  mainSection: getSectionFromFormik(formikObj.mainSection),
  subSections: getSectionsFromFormik(formikObj.subSections || []),
});

export const getChaptersFromFormik = (formikArr: FormikChapterType[]): Chapter[] =>
  formikArr.map((ch) => getChapterFromFormik(ch));

export const getTutorialFromFormik = (formikObj: FormikTutorialType): Tutorial => ({
  id: formikObj.id,
  name: formikObj.name,
  chapters: getChaptersFromFormik(formikObj.chapters || []),
});
