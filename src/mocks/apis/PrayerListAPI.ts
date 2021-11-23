import { PrayerListItem } from '../../datamodel/PrayerListItem';

export class PrayerListAPI {
  private static items: PrayerListItem[] = [
    {
      title: 'Lorem ipsum',
      date: new Date().toISOString(),
      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam cursus nibh sit amet velit vulputate placerat. Fusce sit amet odio hendrerit diam maximus commodo nec nec felis. Suspendisse potenti. Fusce venenatis orci orci, at mollis magna rhoncus et. Aliquam erat volutpat. Ut convallis ullamcorper nisi, vel mollis nisl bibendum sit amet. Morbi vehicula gravida ipsum nec semper. Aliquam eget erat sit amet metus ullamcorper pretium. Vivamus laoreet purus sed tortor tempor tristique quis eu purus. Ut augue lorem, pellentesque sed pellentesque et, luctus id diam. Suspendisse volutpat nunc ultrices fringilla porttitor.',
      completed: false,
      id: '1',
    },
    {
      title: 'Ut vel tortor',
      date: new Date().toISOString(),
      text: 'Vitae dolor malesuada scelerisque in in nibh. Proin dapibus at sapien quis scelerisque. Aliquam a mattis augue. Aliquam tristique massa quam. Curabitur non sapien ut metus molestie ultrices. Fusce interdum ante id velit posuere condimentum. Proin tempus felis leo, quis dictum eros volutpat quis. Aliquam enim libero, mattis et metus quis, ornare blandit tortor. Duis aliquam semper suscipit. Fusce quis tellus id nisl consequat iaculis. Sed mi orci, pellentesque sed tortor a, commodo malesuada quam.',
      completed: true,
      id: '2',
    },
    {
      title: 'Donec viverra',
      date: new Date().toISOString(),
      text: 'Dapibus nibh, ut sodales nunc placerat vestibulum. Suspendisse posuere, nibh at porttitor faucibus, elit sem hendrerit justo, a varius nisi ligula eget nisi. Cras metus ante, ornare accumsan nibh non, semper ultricies risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras euismod laoreet nisl a posuere. Vestibulum sit amet sem libero. Curabitur finibus nisl ac mi fermentum ullamcorper. Sed facilisis dictum justo. Donec molestie consequat fermentum. Maecenas ac posuere nibh, eu ullamcorper nunc. Donec sapien ipsum, semper sit amet est sit amet, molestie pharetra libero.',
      completed: false,
      id: '3',
    },
    {
      title: 'Sed tellus augue',
      date: new Date().toISOString(),
      text: 'Pretium vitae elit sit amet, consectetur bibendum eros. Aliquam rutrum magna nunc, aliquet placerat tortor congue a. Donec ultrices facilisis faucibus. Integer eu lacinia nisi. Sed sed est quis ante venenatis egestas interdum et diam. Vestibulum non accumsan dolor, ut commodo purus. Proin eget fermentum orci. Mauris dictum varius mollis. Ut at odio ligula. Sed commodo porttitor risus, non feugiat nisi aliquam sit amet. In accumsan ante eget mi congue, at cursus justo convallis. Vestibulum et dictum ligula, eget auctor elit.',
      completed: false,
      id: '4',
    },
    {
      title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus',
      date: new Date().toISOString(),
      text: 'Mauris massa nisi, scelerisque quis mi at, ornare hendrerit augue. Etiam molestie tellus vel vestibulum pretium. Nullam maximus laoreet facilisis. Ut blandit convallis magna. Pellentesque a consequat justo, sit amet interdum velit. Pellentesque bibendum ex quis orci hendrerit, quis lobortis nisl egestas. Aenean rutrum neque eu ex placerat ullamcorper. Duis id ipsum justo. Praesent tempus ex et mi bibendum rhoncus. Donec lobortis commodo molestie. Donec eu massa malesuada, laoreet ligula tempor, suscipit ipsum. Quisque lacinia diam placerat tellus mattis viverra nec id eros. Pellentesque ac scelerisque ex. Praesent tempor mauris turpis, eu convallis nunc luctus in. Pellentesque et velit eget est ultrices molestie.',
      completed: true,
      id: '5',
    },
    {
      title: 'Quisque',
      date: new Date().toISOString(),
      text: 'Commodo lacus ac sapien venenatis vestibulum. Pellentesque egestas ex nec purus dapibus sagittis. Ut id magna nulla. Mauris blandit consequat ipsum ut venenatis. Ut tempus id neque eu pellentesque. Vestibulum facilisis massa quis justo hendrerit, at ornare neque suscipit. Aenean at aliquam neque. Proin nec consectetur nisl, sed posuere mi. Praesent ut fermentum ipsum, in bibendum urna. Maecenas ullamcorper nunc in ligula mollis, ac eleifend sapien accumsan.',
      completed: false,
      id: '6',
    },
    {
      title: 'In quis condimentum metus',
      date: new Date().toISOString(),
      text: 'Aenean in fringilla orci. Donec sed volutpat nisi. Maecenas ac scelerisque enim, a vehicula quam. Nam non dui id nunc blandit sodales. Cras at lacus quis eros faucibus vestibulum. Etiam risus est, imperdiet sed erat sit amet, porta luctus odio. Aliquam id ligula sed nunc accumsan hendrerit. Proin vel tellus libero. In diam lorem, consequat ut dignissim eu, gravida eu justo. Nunc vel euismod velit.',
      completed: false,
      id: '7',
    },
    {
      title: 'Integer aliquam dui vitae lacinia euismod',
      date: new Date().toISOString(),
      text: 'Curabitur interdum, neque quis luctus egestas, sem leo scelerisque diam, eget suscipit lorem ipsum et risus. Mauris et metus arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam pharetra, quam eget finibus luctus, dolor nisi ornare nibh, et porttitor lorem magna semper orci. Quisque id velit a lacus faucibus semper at non urna. Sed sit amet purus at mauris laoreet mattis. Etiam vitae tempor dolor.',
      completed: true,
      id: '8',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      date: new Date().toISOString(),
      text: 'Sed in odio vel nulla ultricies commodo eget non neque. Praesent aliquam bibendum dictum. In hac habitasse platea dictumst. Fusce vitae aliquam felis. Duis mollis nunc id magna interdum placerat. Sed viverra eleifend ipsum, eu efficitur libero pulvinar at. Cras sem est, feugiat a auctor nec, vulputate ut odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus rutrum mauris ac metus fringilla suscipit. Donec enim diam, dictum eget turpis vitae, gravida aliquam nisl. Integer id nisl ut enim porttitor tristique. Praesent tellus tortor, viverra non sapien a, hendrerit laoreet ipsum. Aenean condimentum mollis erat, a interdum elit placerat et. Integer lacinia nulla ac sem imperdiet, et elementum felis vestibulum. Ut vehicula hendrerit dolor, a mattis enim pulvinar non. Etiam euismod iaculis mollis.',
      completed: false,
      id: '9',
    },
    {
      title: 'Aliquam ornare sem sed nibh interdum',
      date: new Date().toISOString(),
      text: 'In consectetur massa consectetur. Etiam sagittis varius luctus. Suspendisse porttitor pellentesque nisi, sed facilisis diam finibus ac. Praesent facilisis, nibh vitae vestibulum eleifend, diam augue porta lacus, et cursus ligula ex scelerisque dui. Nam aliquam eleifend sollicitudin. Praesent a quam efficitur, sollicitudin nulla in, interdum lacus. Nullam ultricies condimentum arcu, et cursus mauris hendrerit sed. Praesent blandit turpis consectetur sollicitudin luctus. Aenean efficitur varius risus, et varius ante vehicula nec. Donec pulvinar tortor eros, vel ultrices felis consectetur nec. Duis ornare justo eu nisi rhoncus, ac egestas metus facilisis. Nullam quis mauris sed mi dapibus efficitur. Duis orci nisi, varius et metus id, tempor euismod lacus. Donec id tortor nulla. Quisque et sem neque. Duis aliquam augue nec purus sagittis convallis.',
      completed: false,
      id: '10',
    },
    {
      title: 'Phasellus sit amet sagittis turpis',
      date: new Date().toISOString(),
      text: 'Etiam id mauris eu lectus fringilla imperdiet. Pellentesque convallis in erat quis accumsan. Sed orci velit, consectetur sed fermentum non, congue et magna. Etiam bibendum erat in enim sagittis, ut fringilla risus mattis. Pellentesque vel augue ante. Fusce aliquet ut metus pharetra bibendum. Sed dignissim facilisis diam id vestibulum. In bibendum augue non mattis imperdiet. Sed varius purus eu ex vulputate faucibus.',
      completed: true,
      id: '11',
    },
    {
      title: 'Integer luctus enim ac neque semper, non porta lorem finibus',
      date: new Date().toISOString(),
      text: 'Cras id justo a metus semper congue nec quis lorem. Mauris eleifend placerat felis, a finibus dui efficitur eget. Integer nec blandit velit. Maecenas mi mauris, gravida sed urna vel, auctor posuere nulla. Pellentesque commodo nisl in dui volutpat dignissim. Donec non massa et purus lacinia laoreet sed ut tellus. Nulla non felis eget leo bibendum elementum nec eget orci.',
      completed: false,
      id: '12',
    },
  ];

  public static getPrayerItems(allItems = true, limit = -1) {
    let itemsToReturn;
    if (limit === -1) {
      itemsToReturn = PrayerListAPI.items.slice(0, limit);
    } else {
      itemsToReturn = PrayerListAPI.items.slice();
    }

    if (allItems) {
      return itemsToReturn;
    }

    return itemsToReturn.filter((item) => {
      return !item.completed;
    });
  }

  public static getPrayerItemByID(id: string): PrayerListItem | null {
    const filteredItems = PrayerListAPI.items.filter((item) => {
      return item.id === id;
    });

    if (filteredItems.length === 1) {
      return filteredItems[0];
    }

    return null;
  }

  public static markCompleted(id: string, completed: boolean) {
    let success = false;
    PrayerListAPI.items.forEach((item) => {
      if (item.id === id) {
        item.completed = completed;
        success = true;
      }
    });

    if (!success) {
      throw new Error('No items found with that ID');
    }
  }

  public static newItem(item: PrayerListItem) {
    PrayerListAPI.items.push(item);
  }
}
