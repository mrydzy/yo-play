# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table "USER" ("name" VARCHAR NOT NULL,"surname" VARCHAR NOT NULL,"email" VARCHAR NOT NULL);

# --- !Downs

drop table "USER";

