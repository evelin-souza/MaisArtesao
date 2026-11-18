import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasIniciais1795004912706 implements MigrationInterface {
    name = 'CriarTabelasIniciais1795004912706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria" ("id_categoria" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, CONSTRAINT "PK_950063d23664f5aaec4dcada4d4" PRIMARY KEY ("id_categoria"))`);
        await queryRunner.query(`CREATE TABLE "movimentacao_estoque" ("id_movimentacao" SERIAL NOT NULL, "id_produto" integer NOT NULL, "tipo_movimentacao" character varying(20) NOT NULL, "quantidade" integer NOT NULL, "data_movimentacao" TIMESTAMP NOT NULL DEFAULT now(), "motivo" character varying(255), CONSTRAINT "PK_caf669d7c299ade30981ddc138a" PRIMARY KEY ("id_movimentacao"))`);
        await queryRunner.query(`CREATE TABLE "produto" ("id_produto" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text NOT NULL, "preco" numeric(10,2) NOT NULL, "quantidade_estoque" integer NOT NULL DEFAULT '0', "imagem_url" character varying, "status" character varying NOT NULL DEFAULT 'ativo', "data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "id_artesao" integer, "id_categoria" integer, CONSTRAINT "PK_f2b1720180a26c8964d76b60276" PRIMARY KEY ("id_produto"))`);
        await queryRunner.query(`CREATE TABLE "item_venda" ("id_item_venda" SERIAL NOT NULL, "id_venda" integer NOT NULL, "id_produto" integer NOT NULL, "quantidade" integer NOT NULL, "preco_unitario" numeric(10,2) NOT NULL, "percentual_comissao" numeric(5,2), "valor_comissao" numeric(10,2), "valor_repasse" numeric(10,2), CONSTRAINT "PK_133a94e491d03b03246fdae0491" PRIMARY KEY ("id_item_venda"))`);
        await queryRunner.query(`CREATE TABLE "pagamento" ("id_pagamento" SERIAL NOT NULL, "id_venda" integer NOT NULL, "forma_pagamento" character varying(30) NOT NULL, "valor" numeric(10,2) NOT NULL, "data_pagamento" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(20) NOT NULL DEFAULT 'APROVADO', CONSTRAINT "PK_d8afafba7a68e8032ec5d597990" PRIMARY KEY ("id_pagamento"))`);
        await queryRunner.query(`CREATE TABLE "venda" ("id_venda" SERIAL NOT NULL, "id_cliente" integer, "id_artesao" integer NOT NULL, "data_venda" TIMESTAMP NOT NULL DEFAULT now(), "valor_total" numeric(10,2) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'CONCLUIDA', CONSTRAINT "PK_0b5cb96cfbe10a76e19661e2175" PRIMARY KEY ("id_venda"))`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id_cliente" SERIAL NOT NULL, "id_usuario" integer NOT NULL, "cpf" character varying(14) NOT NULL, "endereco" character varying(255), CONSTRAINT "UQ_980ea33e938c719bbababe43526" UNIQUE ("cpf"), CONSTRAINT "REL_679622fb965353efd5e328c549" UNIQUE ("id_usuario"), CONSTRAINT "PK_dbf4725e2849f4036253ee7dbd0" PRIMARY KEY ("id_cliente"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha_hash" character varying NOT NULL, "telefone" character varying NOT NULL, "tipo_usuario" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "data_cadastro" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying(11), "endereco" character varying, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_28cd8597e57c8197d4929a98e7a" UNIQUE ("cpf"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "artesao" ("id_artesao" SERIAL NOT NULL, "especialidade" character varying NOT NULL, "id_usuario" integer, CONSTRAINT "REL_59b3901ad7e12f51c09f3f8799" UNIQUE ("id_usuario"), CONSTRAINT "PK_9fee148f40ba55436517dd1a3ad" PRIMARY KEY ("id_artesao"))`);
        await queryRunner.query(`ALTER TABLE "movimentacao_estoque" ADD CONSTRAINT "FK_d05cd8ee5949da6b11b20ba0805" FOREIGN KEY ("id_produto") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_4e343ca9b7edd330a048675cbca" FOREIGN KEY ("id_artesao") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produto" ADD CONSTRAINT "FK_b4b4301786e895495ebff7687a8" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_venda" ADD CONSTRAINT "FK_9d8953454725b953cb6f9886639" FOREIGN KEY ("id_venda") REFERENCES "venda"("id_venda") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_venda" ADD CONSTRAINT "FK_1abe29a69d5ea607a388b9e8ed0" FOREIGN KEY ("id_produto") REFERENCES "produto"("id_produto") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pagamento" ADD CONSTRAINT "FK_9f836d49e72f9cf8d133239cc57" FOREIGN KEY ("id_venda") REFERENCES "venda"("id_venda") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_a8a0ff255844d5da75276d5c729" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venda" ADD CONSTRAINT "FK_ad4ddb1ae30e6881d196e0b6289" FOREIGN KEY ("id_artesao") REFERENCES "artesao"("id_artesao") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cliente" ADD CONSTRAINT "FK_679622fb965353efd5e328c549a" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artesao" ADD CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artesao" DROP CONSTRAINT "FK_59b3901ad7e12f51c09f3f8799f"`);
        await queryRunner.query(`ALTER TABLE "cliente" DROP CONSTRAINT "FK_679622fb965353efd5e328c549a"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_ad4ddb1ae30e6881d196e0b6289"`);
        await queryRunner.query(`ALTER TABLE "venda" DROP CONSTRAINT "FK_a8a0ff255844d5da75276d5c729"`);
        await queryRunner.query(`ALTER TABLE "pagamento" DROP CONSTRAINT "FK_9f836d49e72f9cf8d133239cc57"`);
        await queryRunner.query(`ALTER TABLE "item_venda" DROP CONSTRAINT "FK_1abe29a69d5ea607a388b9e8ed0"`);
        await queryRunner.query(`ALTER TABLE "item_venda" DROP CONSTRAINT "FK_9d8953454725b953cb6f9886639"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_b4b4301786e895495ebff7687a8"`);
        await queryRunner.query(`ALTER TABLE "produto" DROP CONSTRAINT "FK_4e343ca9b7edd330a048675cbca"`);
        await queryRunner.query(`ALTER TABLE "movimentacao_estoque" DROP CONSTRAINT "FK_d05cd8ee5949da6b11b20ba0805"`);
        await queryRunner.query(`DROP TABLE "artesao"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TABLE "pagamento"`);
        await queryRunner.query(`DROP TABLE "item_venda"`);
        await queryRunner.query(`DROP TABLE "produto"`);
        await queryRunner.query(`DROP TABLE "movimentacao_estoque"`);
        await queryRunner.query(`DROP TABLE "categoria"`);
    }

}
