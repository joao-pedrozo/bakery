import { connectTestDB, disconnectDB } from "../db/index";

async function testConnection() {
  console.log("🔍 Testando conexão com o banco de teste...");

  try {
    await connectTestDB();
    console.log("✅ Conexão bem-sucedida!");
    console.log("📍 URI atual: mongodb://localhost:27017/elysia_demo_test");

    // Testar operação básica
    const mongoose = await import("mongoose");
    const db = mongoose.default.connection;
    console.log(`📊 Nome do banco: ${db.name}`);
    console.log(`🔗 Host: ${db.host}`);
    console.log(`🚪 Porta: ${db.port}`);
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
    console.log("\n💡 Possíveis soluções:");
    console.log("1. Verificar se o Docker está rodando: docker ps");
    console.log("2. Subir o container de teste: bun run test:setup");
    console.log("3. Verificar se a porta 27017 está livre");
  } finally {
    await disconnectDB();
  }
}

testConnection();
