"""Teste de acesso ao NotebookLM via API"""
import asyncio
from notebooklm import NotebookLMClient

async def test_access():
    """Testa se conseguimos acessar os notebooks"""
    try:
        print("Testando acesso ao NotebookLM...")
        
        # Conectar usando a autenticação salva
        client = await NotebookLMClient.from_storage()
        
        async with client:
            # Listar notebooks
            notebooks = await client.notebooks.list()
            print(f"OK! Acesso funcionando! Encontrados {len(notebooks)} notebooks\n")
            
            # Mostrar alguns notebooks
            print("Primeiros 3 notebooks:")
            for i, nb in enumerate(notebooks[:3], 1):
                print(f"  {i}. {nb.title} (ID: {nb.id[:20]}...)")
            
            return True
    except Exception as e:
        print(f"ERRO ao acessar: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    asyncio.run(test_access())
