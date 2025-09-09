-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'USUARIO',
    "cfp" TEXT,
    "telefone" TEXT,
    "endereco" JSONB,
    "conta_confirmada" BOOLEAN NOT NULL,
    "data_cadastro" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Gato" (
    "id_gato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" JSONB NOT NULL,
    "sociavel" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INDISPONIVEL',
    "data_casdastro" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RecebimentoGato" (
    "id_recebimento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_responsavel" TEXT NOT NULL,
    "cpf_responsavel" TEXT NOT NULL,
    "contato_responsavel" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "data_recebimento" DATETIME NOT NULL,
    "observacoes" TEXT,
    "fotos" JSONB,
    "status" TEXT NOT NULL DEFAULT 'RECEBIDO',
    "id_gato" INTEGER,
    CONSTRAINT "RecebimentoGato_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacina" (
    "id_vacina" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL
);

-- CreateTable
CREATE TABLE "AplicacaoVacina" (
    "id_aplicacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_gato" INTEGER NOT NULL,
    "id_vacina" INTEGER NOT NULL,
    "data_aplicacao" DATETIME NOT NULL,
    "validade" DATETIME NOT NULL,
    "proxima_dose" DATETIME,
    "observacoes" TEXT,
    CONSTRAINT "AplicacaoVacina_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AplicacaoVacina_id_vacina_fkey" FOREIGN KEY ("id_vacina") REFERENCES "Vacina" ("id_vacina") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Castracao" (
    "id_castracao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_gato" INTEGER NOT NULL,
    "data_castracao" DATETIME NOT NULL,
    "local" TEXT,
    "responsavel" TEXT,
    "observacoes" TEXT,
    CONSTRAINT "Castracao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AvaliacaoUsuario" (
    "id_avaliacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "data_avaliacao" DATETIME NOT NULL,
    CONSTRAINT "AvaliacaoUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id_solicitacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "data_solicitacao" DATETIME NOT NULL,
    "data_resposta" DATETIME NOT NULL,
    CONSTRAINT "Solicitacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TermoDisponibilidade" (
    "id_termo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "data_assinatura" DATETIME NOT NULL,
    CONSTRAINT "TermoDisponibilidade_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TermoDisponibilidade_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeedbackLarTemporario" (
    "id_feedback" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_solicitacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotos" JSONB NOT NULL,
    "data_feedback" DATETIME NOT NULL,
    CONSTRAINT "FeedbackLarTemporario_id_solicitacao_fkey" FOREIGN KEY ("id_solicitacao") REFERENCES "Solicitacao" ("id_solicitacao") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FormularioAdocao" (
    "id_formulario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_gato" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "data_envio" DATETIME NOT NULL,
    "data_avaliacao" DATETIME,
    "observacoes_admin" TEXT NOT NULL,
    CONSTRAINT "FormularioAdocao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FormularioAdocao_id_gato_fkey" FOREIGN KEY ("id_gato") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recuperacaosenha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "expira_em" DATETIME NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Vacina_nome_key" ON "Vacina"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackLarTemporario_id_solicitacao_key" ON "FeedbackLarTemporario"("id_solicitacao");
