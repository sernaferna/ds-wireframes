import { SectionDocumentation, PartType } from '../../dm/tutorials/TutorialTypes';

export const helpContent: SectionDocumentation[] = [
  {
    mainSection: {
      title: 'Devouring Scripture',
      parts: [
        {
          type: PartType.text,
          content: `This is a **wireframe** for the **Devouring Scripture** website. It's intended to be run from a local developer's machine and/or demoed to potential users of the future site, for the purposes of figuring out what the eventual site should look like and how it should behave.`,
        },
      ],
    },
    subSections: [],
  },
  {
    mainSection: {
      title: 'Parts of the Site',
      parts: [
        {
          type: PartType.text,
          content: `There are a few parts to the site:
  
  * **Home**: A standard landing page into the application, where the most commonly used functions reside
  * **Pray**: A page devoted to your prayer life. Prayer requests can be entered, tracked, and even marked complete when they've been answered or are no longer relevant.
  * **Read/Write**: A page devoted to reading the Scripture and taking notes 
  * **Do**: A page devoted to tracking all of your spiritual activities; reading the Scripture, praying, journalling, or whatever other activities you want to remind yourself to do on a regular basis
  * **Plans**: A list of all of the reading plans made available from **Devouring Scripture**, as well as the ability to create your own
  * **Stats**: A page where you can track how you've been doing.
  
  Each of these sections is outlined in more detail below.`,
        },
      ],
    },
    subSections: [
      {
        title: 'Home',
        parts: [
          {
            type: PartType.text,
            content: `The **Home** tab---the default page you see when coming to the app---is a one stop shop for functions that can be found elsewhere on the site. The ability to access today's reading(s) from the reading plans you're subscribed to, the ability to check off items you've accomplished (such as praying, or reading the Scripture, or journalling), and an at-a-glance view of your prayer list, can all be found here.`,
          },
          {
            type: PartType.text,
            content: `More fulsome versions of all of this functionality can be found elsewhere across the site, but you shouldn't have to navigate all around the site when all you want to do is mark an item complete from your daily to-do list, or see today's Scripture from your reading plans.`,
          },
        ],
      },
      {
        title: 'Pray',
        parts: [
          {
            type: PartType.text,
            content: `This part of the site is devoted to your prayer life. New prayer items can be entered, and a list of all existing prayer items can be viewed. There are even filters to help you find exactly what you're looking for.`,
          },
          {
            type: PartType.text,
            content: `Prayer items can be as complex or as simple as desired. You can include a **title** or not, as you wish, as well as optionally specifying the *kind* of prayer item:
              
  * **Praise**: Something you want to praise God for
  * **Request**: Something you want to ask God for
  * **Confession**: Something you want to confess to God`,
          },
        ],
      },
      {
        title: 'Read',
        parts: [
          {
            type: PartType.text,
            content: `The **Read** tab is focused on reading the Scriptures, with the ability to keep notes.`,
          },
          {
            type: PartType.text,
            content: `The tab is mostly a driver to bring you to the **Bible Gateway** website, and a holding area for all of your notes.`,
          },
        ],
      },
      {
        title: 'Do',
        parts: [
          {
            type: PartType.text,
            content: `The **Do** tab is focused on tracking all of your spiritual action items. Did you read the Scriptures today? Did you pray? Did you disciple your children? Any activities you want to track can be tracked here. We've created a number of activities we think you might want to track, but you don't have to go with our ideas! Create your own, if you wish!`,
          },
          {
            type: PartType.text,
            content: `You might find yourself using the **Do** tab in conjunction with the **Stats** tab, as they go hand-in-hand: The **Stats** tab is where you can track how you've been doing.`,
          },
        ],
      },
      {
        title: 'Plans',
        parts: [
          {
            type: PartType.text,
            content: `The **Plans** tab is where you can track all of the **Reading Plans** you're subscribed to, and subscribe to new plans (or unsubscribe as the case may be).`,
          },
          {
            type: PartType.heading,
            content: 'Custom Plans',
          },
          {
            type: PartType.text,
            content: `If you *really* want to stay on top of your Bible reading you can even create your own reading plans! Click the **New Plan** button and create something specifically tailored to your needs!
              
  There are two types of plan you can create:
  
  * **Free-Form** plans let you manually enter a passage for each day. This type of plan is best when your readings are not necessarily contiguous. For example, if you're creating a plan called "Two Weeks in the Life of Jesus," you would create the plan, make it two weeks long (with or without weekends), and then for each day you can specify passages from the Gospels.
  * A non-freeform plan lets you choose one large section of the Scriptures and spread the verses evenly across the days of the plan. For example, if you want to create a plan that goes through the Psalms in a year you would be better creating a non-free-form plan, choosing 52 weeks, entering \`Psalms\` for the overall reference, and the New Plan page will distribute verses from the Psalms across each day of your 52 weeks.
      * You would have the ability to tweak this by moving verses up or down between the days to get a better delineation between each day. For example, you might want to have an extra verse included in Day 22 and one less in Day 23 because it makes Day 22 end nicely.`,
          },
        ],
      },
      {
        title: 'Stats',
        parts: [
          {
            type: PartType.text,
            content: `The **Stats** tab provides a visualisation of how you've been doing with the items you track in the **Do** tab. You may not care about all of the stats we're tracking, so feel free to hide any of the graphics that are less helpful to you, and re-order them as you wish!`,
          },
        ],
      },
    ],
  },
];
