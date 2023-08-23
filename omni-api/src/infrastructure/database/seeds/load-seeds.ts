import {dataSource} from '../../../../data-source';
import {loadUsers} from '@infrastructure/database/seeds/providers/user.seed-provider';
import * as process from 'process';
import {Logger} from '@nestjs/common';
import {loadEventTypes} from '@infrastructure/database/seeds/providers/event-type.seed-provider';
import {loadEvents} from '@infrastructure/database/seeds/providers/events.seed-provider';
import {loadSubscriptions} from "@infrastructure/database/seeds/providers/event-subscriptions.seed-provider";

export async function load(): Promise<void> {
  Logger.log('Running fixtures!');
  const connection = await dataSource.initialize();
  Logger.log('Loading users!');
  const users = await loadUsers(connection.manager);

  Logger.log('Loading Event types!');
  const eventTypes = await loadEventTypes(connection.manager);

  Logger.log('Loading events!');
  const events = await loadEvents(connection.manager, eventTypes);

  Logger.log('Loading subscriptions!');

  await loadSubscriptions(connection.manager, users, events);
  Logger.log('Finished loading seeds 🚀🚀🚀');
}

load().then(() => process.exit(0));
