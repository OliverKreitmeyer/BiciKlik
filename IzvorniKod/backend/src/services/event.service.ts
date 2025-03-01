import { Event } from '../models/event.model';
import { Route } from '../models/route.model';
import { Organizer } from '../models/organizer.model';
import { AppUser } from '../models/appuser.model';

export const getLastTenEvents = async () => {
  const events = await Event.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Route,
        attributes: ['route_id', 'route_name'],
      },
      {
        model: Organizer,
        include: [
          {
            model: AppUser,
            attributes: ['name'],
          },
        ],
        attributes: ['email'],
      },
    ],
  });

  return events.map(event => ({
    route_id: event.route_id,
    short_description: event.description,
    organizer: event.organizer.appUser.name,
    event_name: event.event_name,
    event_time: event.event_time,
  }));
};