create event cleanup
    on schedule every 1 month
    do
      delete from users where deleted < timestampadd(week, -1, current_timestamp());
      delete from quotes where deleted < timestampadd(week, -1, current_timestamp());
      delete from boards where deleted < timestampadd(week, -1, current_timestamp());