import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1707392018429 implements MigrationInterface {
  name = 'Migration1707392018429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`CommentRetweet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`commentId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`CommentBookmarked\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`commentId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`CommentFavorited\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`commentId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`likesCount\` int NOT NULL DEFAULT '0', \`retweetsCount\` int NOT NULL DEFAULT '0', \`bookmarksCount\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`tweetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`TweetBookmarked\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`tweetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`TweetFavorited\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`tweetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Tweet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`likesCount\` int NOT NULL DEFAULT '0', \`retweetsCount\` int NOT NULL DEFAULT '0', \`bookmarksCount\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bio\` varchar(255) NULL, \`image\` varchar(255) NULL, \`followersCount\` int NOT NULL DEFAULT '0', \`followingCount\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` (\`userId\`), UNIQUE INDEX \`REL_9e70fe39bace1b4fe0a96e5720\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Follow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`followerId\` int NOT NULL, \`followingId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_de4653f1772167c1f81cd62a4a\` (\`username\`, \`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`TweetRetweet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NOT NULL, \`tweetId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentRetweet\` ADD CONSTRAINT \`FK_f228f898482189e0bcd805dde4c\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentRetweet\` ADD CONSTRAINT \`FK_2cf37c83a8bfd768abb686110d4\` FOREIGN KEY (\`commentId\`) REFERENCES \`Comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentBookmarked\` ADD CONSTRAINT \`FK_36d15f3f23f69efe3e6cfbcb716\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentBookmarked\` ADD CONSTRAINT \`FK_a4d260ddedc6d26a4452811a709\` FOREIGN KEY (\`commentId\`) REFERENCES \`Comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentFavorited\` ADD CONSTRAINT \`FK_7de350b8ff0467d5e023bc9c0f7\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentFavorited\` ADD CONSTRAINT \`FK_493657ec76fee303840e50dd799\` FOREIGN KEY (\`commentId\`) REFERENCES \`Comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Comment\` ADD CONSTRAINT \`FK_4c827119c9554affb8018d4da82\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Comment\` ADD CONSTRAINT \`FK_36d7f3147efdc41669f63092f66\` FOREIGN KEY (\`tweetId\`) REFERENCES \`Tweet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetBookmarked\` ADD CONSTRAINT \`FK_aa930fcc3d23456d055b68e6061\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetBookmarked\` ADD CONSTRAINT \`FK_ac689feac1bf6f9fb8f15d761e8\` FOREIGN KEY (\`tweetId\`) REFERENCES \`Tweet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetFavorited\` ADD CONSTRAINT \`FK_82fb16772d413c986f28d3b3764\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetFavorited\` ADD CONSTRAINT \`FK_9fd3c4f4fa9d5a1a02310064f46\` FOREIGN KEY (\`tweetId\`) REFERENCES \`Tweet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Tweet\` ADD CONSTRAINT \`FK_ff18ba36d40d786beea6ad36daa\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Profile\` ADD CONSTRAINT \`FK_9e70fe39bace1b4fe0a96e57203\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Follow\` ADD CONSTRAINT \`FK_95e2aeeb6fb7219c842d9ec0947\` FOREIGN KEY (\`followerId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Follow\` ADD CONSTRAINT \`FK_5b852d17d7ebcd6c64b4ad776e0\` FOREIGN KEY (\`followingId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetRetweet\` ADD CONSTRAINT \`FK_a9336871485d1feb172366751c6\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetRetweet\` ADD CONSTRAINT \`FK_3395c555c42978733a997b12a2d\` FOREIGN KEY (\`tweetId\`) REFERENCES \`Tweet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`TweetRetweet\` DROP FOREIGN KEY \`FK_3395c555c42978733a997b12a2d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetRetweet\` DROP FOREIGN KEY \`FK_a9336871485d1feb172366751c6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Follow\` DROP FOREIGN KEY \`FK_5b852d17d7ebcd6c64b4ad776e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Follow\` DROP FOREIGN KEY \`FK_95e2aeeb6fb7219c842d9ec0947\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Profile\` DROP FOREIGN KEY \`FK_9e70fe39bace1b4fe0a96e57203\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Tweet\` DROP FOREIGN KEY \`FK_ff18ba36d40d786beea6ad36daa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetFavorited\` DROP FOREIGN KEY \`FK_9fd3c4f4fa9d5a1a02310064f46\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetFavorited\` DROP FOREIGN KEY \`FK_82fb16772d413c986f28d3b3764\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetBookmarked\` DROP FOREIGN KEY \`FK_ac689feac1bf6f9fb8f15d761e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`TweetBookmarked\` DROP FOREIGN KEY \`FK_aa930fcc3d23456d055b68e6061\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Comment\` DROP FOREIGN KEY \`FK_36d7f3147efdc41669f63092f66\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Comment\` DROP FOREIGN KEY \`FK_4c827119c9554affb8018d4da82\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentFavorited\` DROP FOREIGN KEY \`FK_493657ec76fee303840e50dd799\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentFavorited\` DROP FOREIGN KEY \`FK_7de350b8ff0467d5e023bc9c0f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentBookmarked\` DROP FOREIGN KEY \`FK_a4d260ddedc6d26a4452811a709\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentBookmarked\` DROP FOREIGN KEY \`FK_36d15f3f23f69efe3e6cfbcb716\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentRetweet\` DROP FOREIGN KEY \`FK_2cf37c83a8bfd768abb686110d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`CommentRetweet\` DROP FOREIGN KEY \`FK_f228f898482189e0bcd805dde4c\``,
    );
    await queryRunner.query(`DROP TABLE \`TweetRetweet\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_de4653f1772167c1f81cd62a4a\` ON \`User\``,
    );
    await queryRunner.query(`DROP TABLE \`User\``);
    await queryRunner.query(`DROP TABLE \`Follow\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9e70fe39bace1b4fe0a96e5720\` ON \`Profile\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9e70fe39bace1b4fe0a96e5720\` ON \`Profile\``,
    );
    await queryRunner.query(`DROP TABLE \`Profile\``);
    await queryRunner.query(`DROP TABLE \`Tweet\``);
    await queryRunner.query(`DROP TABLE \`TweetFavorited\``);
    await queryRunner.query(`DROP TABLE \`TweetBookmarked\``);
    await queryRunner.query(`DROP TABLE \`Comment\``);
    await queryRunner.query(`DROP TABLE \`CommentFavorited\``);
    await queryRunner.query(`DROP TABLE \`CommentBookmarked\``);
    await queryRunner.query(`DROP TABLE \`CommentRetweet\``);
  }
}
