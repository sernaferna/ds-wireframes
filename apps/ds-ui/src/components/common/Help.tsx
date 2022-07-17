import React from 'react';
import { Container } from 'react-bootstrap';
import { Tutorial } from './tutorial/Tutorial';
import { SectionDocumentation, PartType } from './tutorial/TutorialTypes';

const helpContent: SectionDocumentation[] = [
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
      title: 'Your Data',
      parts: [
        {
          type: PartType.text,
          content: `It's important to know who you're giving your private data to, and what they do with it, so we wanted to take a minute to talk about how we do (and do *not*) use your data.`,
        },
        {
          type: PartType.text,
          content: `When it comes to data that's personal to you, nobody has access to that data but you. Nobody on the **Devouring Scripture** staff is able to read the notes you take when you're reading your Bible, or read your prayer items, or see how you've been doing on your stats. When you enter information like that into our site, it goes straight into an encrypted database, where the data can only be decrypted by your specific user account. Our support staff can do a lot of things with that datavase, but one thing we *can't* do is look at your data---it can't be decrypted even by us!
          
We do collect some anonymous data, however, that can't be tied back to you. This information is used for planning purposes, so that we can tell what parts of the application are being heavily used (and therefore deserve more attention) and what parts aren't (and therefore might not be worth spending valuable time on).

Let's look at a concrete example. Suppose Hemant logs onto the site, and creates a prayer item that's a confession: He cheated on his taxes, and he now feels terrible about it, so he wishes to pray to God for forgiveness. In this case we would track two different pieces of information:

1. All of the details about that prayer item---the text that Hemant enters on the website, and the day and time he entered it---gets encrypted and saved in Hemant's area of the database. The next time Hemant logs into the site, using his specific credentials, the data will be retrieved from the database and decrypted, so that he can see it again. If Hemant accesses his **Stats** page it will know that he created a prayer item on such-and-such a day.
1. A separate log entry will be created in a different database, that simply says, "someone created a prayer item." It won't say **Hemant** created a prayer item, and it won't include any of the details about that prayer item, it'll just record that *someone* created a prayer item.

When our support personnel look at our databases they can't tell what Hemant has done or not done; they don't know how often Hemant recorded that he prayed, or the details of those prayers. But they will be able to see how many people created a prayer item each day.`,
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
          content: `The site is intended to have a number of separate areas of functionality:

          * **Home**: A standard landing page into the application, where the most commonly used functions reside
          * **Pray**: A page devoted to your prayer life. Prayer requests can be entered, tracked, and even marked complete when they've been answered or are no longer relevant.
          * **Read**: A page devoted to reading the Scripture, and taking notes if desired
          * **Do**: A page devoted to tracking all of your spiritual activities; reading the Scripture, praying, journalling, or whatever other activities you want to remind yourself to do on a regular basis
          * **Plans**: A list of all of the reading plans made available from **Devouring Scripture**, as well as the ability to create your own
          * **Stats**: A page where you can track how you've been doing. This data is between you and God, the **DS** website doesn't allow anyone else to see this information---not even our own support staff!
          
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
            content: `The **Home** tab---the default page you'll see when coming to the app---is a one stop shop for functions that can be found elsewhere on the site. The ability to access today's reading(s) from the reading plans you're subscribed to, the ability to check off items you've accomplished (such as praying, or reading the Scripture, or journalling), and an at-a-glance view of your prayer list, can all be found here.`,
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
            content: `This part of the site is devoted to your prayer life. New prayer items can be entered, and a list of all existing prayer items can be viewed -- with filters to help you find exactly what you're looking for.`,
          },
          {
            type: PartType.text,
            content: `Prayer items can be as complex or as simple as desired. You can include a title, or not, as you wish, as well as specifying the *kind* of prayer item:
            
* **Praise**: Something you want to praise God for
* **Request**: Something you want to ask God for
* **Confession**: Something you want to confess to God

Again, it's worth a reminder that nobody can see your prayer items but you. Not even the **Devouring Scripture** administrators or support staff can read your prayer items.`,
          },
        ],
      },
      {
        title: 'Read',
        parts: [
          {
            type: PartType.text,
            content: `The **Read** tab is focused on reading the Scriptures, with the [optional] ability to take notes.`,
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
            content: `The **Do** tab is focused on tracking all of your spiritual action items. Did you read the Scriptures today? Did you pray? Did you disciple your children? Any activities that you want to track can be tracked here. We've created a number of activities we think you might want to track, but you don't have to go with our ideas! Create your own, if you wish!`,
          },
          {
            type: PartType.text,
            content: `You might find yourself using the **Do** tab in conjunction with the **Stats** tab, as they go hand-in-hand: The **Stats** tab is where you can track how you've been doing.
            
Again, it's worth a reminder that nobody can see your data but you. Not even the **Devouring Scripture** administrators or support staff can check up on whether you've been reading your Bible, or praying.`,
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
            type: PartType.text,
            content: `If you *really* want to stay on top of your Bible reading, you can even create your own reading plans! Click the **New Plan** button, and create something specifically tailored to your needs!
            
There are two types of plan you can create:

* **Free-Form** plans let you manually enter a passage for each day. 
* The non-Free Form version of a plan lets you choose one large reference, and then spread the verses from that reference evenly across the days of the plan.

A free-form plan is best when your readings are not necessarily contiguous. For example, if you're creating a plan called "Two Weeks in the Life of Jesus," you would create the plan, make it two weeks long (with or without weekends), and then for each day you can specify passages from the Gospels.

On the other hand, if you want to create a plan that goes through the Psalms in a year, you would be better creating a non-free-form plan, entering Psalms for the overall reference, and the New Plan page will distribute verses from the Psalms across each day. You would have the ability to tweak this, however, by moving verses up or down between the days, to get a better delineation between each day. (That is, maybe you might want to have an extra verse included in Day 22, and one less in Day 23, because it makes Day 22 end nicely.)`,
          },
        ],
      },
      {
        title: 'Stats',
        parts: [
          {
            type: PartType.text,
            content: `The **Stats** tab provides a visualisation of how you've been doing with the items you track in the **Do** tab. You may not care about all of the stats we're tracking, so feel free to hide any of the graphics that are less helpful to you, and re-order them as you wish!
            
Again, it's worth a reminder that nobody can see your data but you. Not even the **Devouring Scripture** administrators or support staff can check up on whether you've been reading your Bible, or praying.`,
          },
        ],
      },
    ],
  },
];

/**
 * Shows a tutorial for the Help screen
 */
export const Help = () => {
  return (
    <Container>
      <Tutorial sections={helpContent} />
    </Container>
  );
};
