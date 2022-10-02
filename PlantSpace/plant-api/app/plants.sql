DROP SCHEMA IF EXISTS `plants-app`;

CREATE SCHEMA `plants-app`;

CREATE TABLE `plants-app`.`users` (
    `id` VARCHAR(45) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (`id`)
);

INSERT INTO `plants-app`.`users` (
    `id`,
    `email`,
    `password`
)
-- VALUES for users
VALUES
    -- passwords: 'pass'
    -- Fake Duncan
    ('123', 'Duncan@email.com', '$2b$10$xHwUfXG6oQp0qK.jnq9QZenOHH9qLYzUvRXoRXqDisBK1RoDOpzOW'),
    -- Fake Test User
    ('369', 'Test@email.com', '$2b$10$uix0V2iHwBkJlRNNrqnmpem99rO5/BQ9utBvZrrlnvH3hZHN4ynyC')
;

CREATE TABLE `plants-app`.`plants` (
    `id` INT NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
	`category` VARCHAR(255) NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `water` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `light` VARCHAR(20) NOT NULL,
    `image` VARCHAR(255) NULL,
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `plants-app`.`garden_items` (
    `id` INT NOT NULL UNIQUE auto_increment,
    `plant_id` INT NOT NULL,
    `user_id` VARCHAR(45) NOT NULL,
    `quantity` INT NOT NULL default 1,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`plant_id`) REFERENCES `plants`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);


INSERT INTO `plants-app`.`plants` (  
    `id`, `name`, `category`,
    `size`, `water`, `description`,
    `light`, `image`) 

-- VALUES (  `id`, `name`, `category`, `size`, `water`, `description`,'light', `image`)
VALUES 
    ('1', 'Snake Plant', 'Indoor', 'Small-medium', 'Weekly watering', 'Hard to kill, easy to maintain', 'Low light', 'https://asset.bloomnation.com/c_pad,d_vendor:global:catalog:product:image.png,f_auto,fl_preserve_transparency,q_auto/v1607669042/vendor/7797/catalog/product/2/0/20200304122155_file_5e5ef4a3ccb60_5e5ef7b7cd5fa_5f46d0e447fec_5f46d0e64c3aa.jpg'),
    ('2', 'Spider Plant', 'Indoor', 'Small-medium', 'Weekly watering', 'Grows fast and retains water well', 'Low light', 'https://i5.walmartimages.com/asr/009953cf-0f8e-4274-8e1c-8b00d6c4d0d6.0b981dfff16f20267b06f9866730e563.jpeg'),
    ('3', 'Peace Lily', 'Indoor', 'Small-medium', 'Moderate watering', 'Toxic to cats, hard to overwater', 'Medium light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557254656-spathiphyllum-peace-lily-royalty-free-image-621819148-1557254631.jpg?crop=0.668xw:1.00xh;0.106xw,0&resize=768:*'),
    ('4', 'Mini Jade', 'Indoor', 'Small', 'Weekly watering', 'Toxic to cats and dogs, hard to kill', 'Medium light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660074685-41378e7d-d10d-4a1a-a70e-e0291ffc1bd8_1.eb2b82f950df88e915c5afe813dc29db.jpg?crop=0.845xw:0.845xh;0.0369xw,0.0881xh&resize=768:*'),
    ('5', 'Money Tree', 'Indoor', 'Medium',	'Water only when soil is dry',	'Known for being a symbol of good luck', 'High light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1658931779-51RJ3e6NEdL._SL500_.jpg?crop=1.00xw:0.752xh;0,0.248xh&resize=768:*'),
    ('6', 'Asparagus Fern', 'Indoor', 'Medium',	'Keep soil moist at all times',	'Toxic to cats and dogs, loves bright spaces as well as low light areas', 'Medium light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1554477330-beautiful-asparagus-fern-plant-in-a-basket-royalty-free-image-972247932-1546889240.jpg?crop=0.457xw:0.301xh;0.447xw,0.372xh&resize=768:*'),
    ('7', 'String of Hearts', 'Indoor', 'Small-large',	'Frequent watering', 'Native to south africa, can grow vines to 12 ft long', 'High light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660075940-best-indoor-plants-string-of-hearts-1660075916.jpg?crop=0.716xw:1.00xh;0.0978xw,0&resize=768:*'),
    ('8', 'Philodendron', 'Indoor', 'Small-medium',	'Weekly watering, prefers to be in dryer soil',	'Known in Greece as the plant of love',	'Low light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557257186-the-modern-room-interior-with-a-lot-of-different-royalty-free-image-979579482-1557257137.jpg?crop=0.595xw:0.892xh;0.306xw,0.0962xh&resize=768:*' ),
    ('9', 'Calathea Ornata', 'Indoor', 'Small',	'Keep soil lightly moist', 'Known as the zebra plant',	'Indirect light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660076337-51s8e9ADIvL._SL500_.jpg?crop=0.966xw:1xh;center,top&resize=768:*'),
    ('10', 'Rubber Plant', 'Indoor', 'Medium',	'Weekly water, prefers to be in dryer soil', 'Native in asia and known to be low matinence', 'Low light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557256241-pot-plant-close-up-elevated-view-high-res-stock-photography-829464-001-1557256205.jpg?crop=1.00xw:0.801xh;0,0.103xh&resize=768:*'),
    ('11', 'Dragon Tree', 'Indoor', 'Small-medium',	'Moderate watering', 'Toxic to cats and dogs', 'Low light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557255687-flowers-in-a-pot-indoors-royalty-free-image-940610580-1557255594.jpg?crop=0.559xw:0.839xh;0,0.142xh&resize=768:*'),
    ('12', 'ZZ Plant', 'Indoor', 'Small', 'Weekly watering', 'Known as the king of indestructable plants',	'Low light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660073901-best-indoor-plants-zz-plant-1660073875.png?crop=1.00xw:0.802xh;0,0.168xh&resize=768:*'),
    ('13', 'Air Plant', 'Indoor', 'Small', 'Daily watering', 'Does not need soil to grow', 'Low light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1557179346-air-plants-royalty-free-image-932521176-1557179326.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=768:*'),
    ('14', 'Yucca', 'Indoor', 'Medium', 'Water sparingly',	'Needs to be in deep container due to being top-heavy',	'High light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660074929-40889412.jpg?crop=1xw:1.00xh;center,top&resize=768:*'),
    ('15', 'English Ivy', 'Indoor', 'Medium-large',	'Frequently', 'Looks great on standing walls and topiaries', 'High light', 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660073579-512UawMs32L._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=768:*')
;
INSERT INTO `plants-app`.`garden_items`
	( `plant_id`, `user_id` )
VALUES
    ( '1', '369');
