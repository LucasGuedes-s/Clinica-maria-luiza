-- AlterTable
CREATE SEQUENCE pagamentos_id_seq;
ALTER TABLE "Pagamentos" ALTER COLUMN "id" SET DEFAULT nextval('pagamentos_id_seq');
ALTER SEQUENCE pagamentos_id_seq OWNED BY "Pagamentos"."id";
