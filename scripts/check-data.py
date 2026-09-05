"""Контракт данных: гоняется как `pnpm test` (без зависимостей).
Проверяет то, что уже один раз ломалось в проде: битые картинки
ловит отдельный HEAD-чек, здесь — структуру data.ts.
"""
import re
import sys

SRC = open("app/data.ts", encoding="utf-8").read()
fails: list[str] = []


def check(name: str, cond: bool, detail: str = "") -> None:
    print(("PASS " if cond else "FAIL ") + name + (f" ({detail})" if detail and not cond else ""))
    if not cond:
        fails.append(name)


unis = re.findall(r'\{ name: "([^"]+)"', SRC)
check("28 universities", len(unis) == 28, f"found {len(unis)}")
check("no duplicate names", len(set(unis)) == len(unis))
check("14 AT / 14 HU", SRC.count('country: "AT"') == 14 and SRC.count('country: "HU"') == 14)
for field in ["city", "rank", "fee", "grant", "apply", "specialty", "chance"]:
    check(f"no empty {field}", not re.search(field + r': ""', SRC))

sites_block = SRC.split("export const uniSites")[1].split("};")[0]
sites = re.findall(r'"([^"]+)": "https://', sites_block)
check("every uni has site (except Metropolitan)", set(unis) - set(sites) == {"Metropolitan University"})

# Все site-ключи должны существовать в universities (иначе мёртвые ссылки)
check("no orphan sites", set(sites) - set(unis) == set())

check("4 services", len(re.findall(r'no: "Направление', SRC)) == 4)
check("4 steps", len(re.findall(r'no: "Этап', SRC)) == 4)
check("hero phrases", len(re.findall(r"^\s+\{ t: ", SRC, re.M)) == 3)
check("country pages data", all(k in SRC for k in ["austria", "hungary", "servicesLocal", "faqsLocal", "whyPoints", "included"]))

# Локальные FAQ обеих стран (по 6) + глобальный (10)
_q = SRC.count('q: "')
check("22 faq entries", _q == 22, f"found {_q}")

# Цены без обычных пробелов (иначе рвутся на строках)
check("nbsp prices", "€1 450" not in SRC)

print(f"\n{len(fails)} failures" if fails else "\nall green")
sys.exit(1 if fails else 0)
