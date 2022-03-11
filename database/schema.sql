set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."bookmarks" (
  "userId"         integer         not null,
  "businessId"     text           not null,
  "image"          text           not null,
  "name"           text           not null,
  "rating"         text           not null,
  "address1"       text           not null,
  "address2"       text           null,
  "city"           text           not null,
  "state"          text           not null,
  "zipcode"        text           not null,
  "latitude"       text           not null,
  "longitude"      text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("businessId")
);
