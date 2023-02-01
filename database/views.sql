create or replace view active_users as
    select id, username, phc, created, token_id from users u where u.deleted = false;

create or replace view active_boards as
    select b.id, b.path, b.owner_id, b.title, b.public, b.created from boards b join active_users u on u.id = b.owner_id where b.deleted = false;